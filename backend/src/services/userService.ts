import { User } from "src/entities/User";
import { AppDataSource } from "src/server";
import { UserInput } from "src/utils/interfaces";
import { signJwt } from "src/utils/jwt";
import { DeepPartial } from "typeorm";
import config from "config";

const userRepository = AppDataSource.getRepository(User);

export const createUser = async(user: UserInput) => {
    // const newUser = manager.create(User, user);
    return await userRepository.save(userRepository.create(user as DeepPartial<User>));
}

export const findOneByEmail = async(email: string) => {
    return await userRepository.findOneBy({ email });
}

export const findOneById = async(userId: string) => {
    return await userRepository.findOneBy({id: userId});
}

export const signTokens = async(user: User) => {
    const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", { expiresIn: `${config.get<number>("accessTokenExpiresIn")}m` });
    const refresh_token = signJwt({ sub: user.id }, "refreshTokenPrivateKey", { expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m` });

    return  { access_token, refresh_token };
}