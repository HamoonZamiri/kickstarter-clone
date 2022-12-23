import { Response } from "express";
import { Project } from "../entities/Project";
import { User } from "../entities/User";

export interface ErrorResponse {
    error: string
}
export interface GenericResponse extends Response {
    message?: string,
    data?: User | Project | Project[] | User[] | string,
    accessToken?: string,
}
export interface CreateUserInput {
    username: string,
    email: string,
    password: string,
}
