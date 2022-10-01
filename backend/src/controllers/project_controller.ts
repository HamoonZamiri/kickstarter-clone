import { Request, Response } from "express"
export const getProjects = async (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({"message": "get all projects"});
};

export const createProject = async (req: Request, res: Response) => {
    if(!req.body.title){
        res.status(400).json({error: "title is required"});
    }
    res.status(201).json({"message": "New Project Created"});
};

export const getProject = async (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({"message": `get project with id ${req.params.id}`});
};

export const updateProject = async (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({"message": `update project with id ${req.params.id}`});
};

export const deleteProject = async (req: Request, res: Response) => {
    res.status(200).json({"message": `delete project with id ${req.params.id}`});
};