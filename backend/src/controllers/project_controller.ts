import { Request, Response } from "express"
export const getProjects = async (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({"message": "get all projects"});
};

export const createProject = async (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({"message": "post new projects"});
};

export const getProject = async (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({"message": `get project with id ${req.params.id}`});
};

export const deleteProject = async (req: Request, res: Response) => {
    res.status(200).json({"message": `delete project with id ${req.params.id}`});
};