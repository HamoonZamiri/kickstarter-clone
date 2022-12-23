import { NextFunction, Request } from "express";
import { findOneById } from "../services/userService";
import { GenericResponse } from "../utils/interfaces";
import { verifyJwt } from "../utils/jwt";

export const requireAuth = async(req: Request, res: GenericResponse, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if(!authorization){
            res.status(401).json({ message: "You are not authorized to make this request" });
            return;
        }
        const token = authorization.split(" ")[1];
        const decoded = await verifyJwt<{sub: string}>(token, "accessTokenPublicKey");
        if(!decoded){
            res.status(401).json({ message: "You are not authorized to make this request" });
            return;
        }
        const user = await findOneById(decoded.sub);
        if(!user){
            res.status(401).json({ message: "You are not authorized to make this request" });
            return;
        }
        next();
    }
    catch(error){
        console.log(error);
        res.status(401).json({ message: "Error while trying to authorize your token" });
        next(error);
    }
}