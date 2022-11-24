import { Response } from "express";
import { Project } from "src/entities/Project";
import { User } from "src/entities/User";

export interface ErrorResponse {
    error: string
}
export interface GenericResponse extends Response {
    message: string,
    data?: User | Project | Project[] | User[] | string,
    accessToken?: string,
}
export interface UserInput {
    username: string,
    email: string,
    password: string,
}
