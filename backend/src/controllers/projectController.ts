import { Request, Response } from "express"
import { ErrorResponse } from "src/utils/interfaces";
import { Project } from "../entities/Project";
import { AppDataSource } from "../server";



export const getProjects = async (req: Request, res: Response<Project[] | ErrorResponse>) => {
    if(req)
        console.log("happy");
    const projects = await AppDataSource.manager.find(Project);
    if(!projects){
        res.status(404).json({ error: "No projects found" });
    }
    else {
        res.status(200).json(projects);
    }
};

export const createProject = async (req: Request, res: Response<Project | ErrorResponse>) => {
    if(!req.body.title){
        res.status(400).json({error: "title is required"});
    }
    if(!req.body.description){
        res.status(400).json({error: "description is required"});
    }

    const newProject = AppDataSource.manager.create(Project, {title: req.body.title, imgUrl: req.body.imgUrl, description: req.body.description});

    const projectSaved = await AppDataSource.manager.save(Project, newProject);
    res.status(201).json(projectSaved);
};

export const getProject = async (req: Request, res: Response<Project | ErrorResponse>) => {
    const { id } = req.params;
    const project = await AppDataSource.manager.findOneBy(Project, {id: id});
    if (project)
        res.status(200).json(project);
    else{
        res.status(404).json({error: "project not found"});
    }
};

export const updateProject = async (req: Request, res: Response<Project | ErrorResponse>) => {
    const { id } = req.params;
    const project = await AppDataSource.manager.findOneBy(Project, { id });
    if (project){
        res.status(200).json(project);
    }
    else{
        res.status(400).json({error: "project could not be updated"});
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    AppDataSource.manager.delete(Project, { id });
    res.status(200).json({"message": `delete project with id ${req.params.id}`});
};