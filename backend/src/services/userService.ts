import { User } from "../entities/User";
import { CreateUserInput, UpdateUserInput } from "../utils/interfaces";
import { signJwt } from "../utils/jwt";
import { DeepPartial } from "typeorm";
import config from "config";
import { AppDataSource } from "../utils/dataSource";

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async() => {
    return await userRepository.find({ relations: { projects: true }});
}
export const createUser = async(user: CreateUserInput) => {
    // const newUser = manager.create(User, user);
    return await userRepository.save(userRepository.create(user as DeepPartial<User>));
}

export const findOneByEmail = async(email: string) => {
    return await userRepository.findOneBy({ email });
}

export const findOneById = async(userId: string) => {
    return await userRepository.findOneBy({id: userId});
}

export const updateUserById = async(id: string, user: Partial<User>) => {
    return await userRepository.update({ id }, user);
}

export const signTokens = async(user: User) => {
    const access_token = signJwt({ sub: user.id }, "accessTokenPrivateKey", { expiresIn: `${config.get<number>("accessTokenExpiresIn")}m` });
    const refresh_token = signJwt({ sub: user.id }, "refreshTokenPrivateKey", { expiresIn: `${config.get<number>("refreshTokenExpiresIn")}m` });

    return  { access_token, refresh_token };
}

export const deleteUserById = async(id: string) => {
    return await userRepository.delete({ id });
}