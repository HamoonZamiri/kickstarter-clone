import { CookieOptions, NextFunction, Request } from "express";
import config from 'config';
import { GenericResponse, UserInput } from "src/utils/interfaces";
import { createUser, findOneByEmail, signTokens } from "src/services/userService";
import { User } from "src/entities/User";

const cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
}

const accessTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + config.get<number>("accessTokenExpiresIn") * 60 * 1000),
    maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + config.get<number>("refreshTokenExpiresIn") * 60 * 1000),
    maxAge: config.get<number>("refreshTokenExpiresIn") * 60 * 1000,
};

export const registerUserHandler = async (req: Request<{}, {}, UserInput>, res: GenericResponse, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const user = await createUser({ username, email: email.toLowerCase(), password });
        res.status(201).json({message: "user was created successfully", data: user});
    }
    catch (error){
        console.log(error);
        res.status(400).json({ message: "user could not be created" });
        next(error);
    }

}

export const loginUserHandler = async(req: Request<{}, {}, UserInput>, res: GenericResponse, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await findOneByEmail(email);
        if(!user || !(await User.comparePassword(password, user.password))){
            res.status(400).json({ message: "invalid credentials" });
            return;
        }
        const {access_token, refresh_token} = await signTokens(user);
        res.cookie("access_token", access_token, accessTokenCookieOptions);
        res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
        res.cookie("logged_in", true, {...accessTokenCookieOptions, httpOnly: false});
        res.status(200).json({ message: "user logged in successfully", data: user, accessToken: access_token });
    }
    catch(error){
        console.log(error);
        res.status(400).json({ message: "user could not be logged in" });
        next(error);
    }
};