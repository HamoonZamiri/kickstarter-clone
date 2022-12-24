import { Response } from "express";
import { Project } from "../entities/Project";
import { User } from "../entities/User";
type ResponseData = User | Project | Project[] | User[] | string;
export interface ErrorResponse {
    error: string
}
export interface GenericResponse extends Response {
    message?: string,
    data?: ResponseData,
    accessToken?: string,
}
export interface CreateUserInput {
    username: string,
    email: string,
    password: string,
}

export type CreateProjectInput = {
    title: string,
    imgUrl?: string,
    description: string,
    daysTillExpiry: number
}
export type UpdateProjectInput = {
    title?: string,
    imgUrl?: string,
    description?: string,
    daysTillExpiry?: number
}