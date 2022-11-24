import config from 'config';
import jwt, { SignOptions } from "jsonwebtoken";

export const signJwt = (
    payload: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options: SignOptions
) => {
    const key = Buffer.from(
        config.get<string>(keyName),
        "base64").toString("ascii");
    return jwt.sign(payload, key, { ...(options && options), algorithm: "RS256"});
};

export const verifyJwt = <T>(
    token: string,
    keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
): T | null => {
    try {
        const key = Buffer.from(
            config.get<string>(keyName),
            "base64").toString("ascii");
        const decoded = jwt.verify(token, key) as T;
        return decoded;
    }
    catch (error){
        return null;
    }
}