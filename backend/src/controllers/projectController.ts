import { Request, Response } from "express"
import { CreateProjectInput, GenericResponse } from "../utils/interfaces";
import { Project } from "../entities/Project";
import { AppDataSource } from "../utils/dataSource";
import { deleteProjectById, findProjectById, getProjects, saveNewProject, updateProjectById } from "../services/projectService";
export const getAllProjects = async (req: Request, res: GenericResponse) => {
    try {
        const projects = await getProjects();
        res.status(200).json({message: "Projects fetched successfully", data: projects});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: "Something went wrong"});
    }
};

export const createProject = async (req: Request<{}, {}, CreateProjectInput>, res: GenericResponse) => {
    try{
        if(!req.body.title){
        res.status(400).json({error: "title is required"});
        }
        if(!req.body.description){
            res.status(400).json({error: "description is required"});
        }
        const newProject: CreateProjectInput = req.body;
        const savedProject = saveNewProject(newProject);
        res.status(201).json({message: "Project created successfully", data: savedProject});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
};

export const getProject = async (req: Request, res: GenericResponse) => {
    const { id } = req.params;
    const project = await findProjectById(id);
    if (project)
        res.status(200).json({message: "Project found", data: project});
    else{
        res.status(404).json({message: "Project not found"});
    }
};

export const updateProject = async (req: Request, res: GenericResponse) => {
    try {
        const { id } = req.params;
        const { title, imgUrl, description, daysTillExpiry } = req.body;
        const updatedProject = await updateProjectById(id, {title, imgUrl, description, daysTillExpiry});
        if (updatedProject){
            res.status(200).json({message: "Project updated successfully", data: updatedProject});
        }
        else{
            res.status(400).json({message: "Project could not be updated"});
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({message: "Project could not be updated"});
    }
};

export const deleteProject = async (req: Request, res: GenericResponse) => {
    try {
        const { id } = req.params;
        const deletedProject = await deleteProjectById(id);
        res.status(200).json({"message": `delete project with id ${req.params.id}`, data: deletedProject});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message: "Project could not be deleted"});
    }
};