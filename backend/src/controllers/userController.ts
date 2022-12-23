import { CookieOptions, NextFunction, Request, Response } from "express";
import config from 'config';
import { CreateUserInput, GenericResponse } from "../utils/interfaces";
import { createUser, findOneByEmail, findOneById, signTokens } from "../services/userService";
import { User } from "../entities/User";
import { signJwt, verifyJwt } from "../utils/jwt";

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

export const refreshAccessTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        const errorMsg = "Could not refresh access token";
        if(!refresh_token){
            return next(new Error(errorMsg));
        }
        const decoded = verifyJwt<{sub: string}>(
            refresh_token,
            "refreshTokenPublicKey"
        )
        if(!decoded)
            return next(new Error(errorMsg));
        const user = await findOneById(decoded.sub);
        if(!user)
            return next(new Error(errorMsg));
        //sign a new access token
        const access_token = signJwt({sub: user.id}, "accessTokenPrivateKey", {
            expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`});

        //add cookies to response
        res.cookie("access_token", access_token, accessTokenCookieOptions);
        res.cookie("logged_in", true, {...accessTokenCookieOptions, httpOnly: false});

        res.status(200).json({message: "access token refreshed successfully", access_token});
    }
    catch(err){
        console.log(err);
        next(err);
    }
}
export const registerUserHandler = async (req: Request<{}, {}, CreateUserInput>, res: GenericResponse, next: NextFunction) => {
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

export const loginUserHandler = async(req: Request<{}, {}, CreateUserInput>, res: GenericResponse, next: NextFunction) => {
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