import { Request, Response } from "express"
import { Project } from "../entities/Project";
import { AppDataSource } from "../server";


export const getProjects = async (req: Request, res: Response) => {
    if(req)
        console.log("happy");
    const projects = await AppDataSource.manager.find(Project);
    if(!projects){
        res.status(404).json({ error: "No projects found" });
    }
    else {
        res.status(200).json({"projects": projects});
    }
};

export const createProject = async (req: Request, res: Response) => {
    if(!req.body.title){
        res.status(400).json({error: "title is required"});
    }
    const project = new Project();
    project.title = req.body.title;
    const projectSaved = await AppDataSource.manager.save(Project, project);
    res.status(201).json({"project created": projectSaved});
};

export const getProject = async (req: Request, res: Response) => {
    const _id  = parseInt(req.params.id);
    const project = await AppDataSource.manager.findOneBy(Project, {id: _id});
    if (project)
        res.status(200).json({"project": project});
    else{
        res.status(404).json({error: "project not found"});
    }
};

export const updateProject = async (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({"message": `update project with id ${req.params.id}`});
};

export const deleteProject = async (req: Request, res: Response) => {
    const _id = parseInt(req.params.id);
    AppDataSource.manager.delete(Project, {id: _id});
    res.status(200).json({"message": `delete project with id ${req.params.id}`});
};