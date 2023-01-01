import { Request } from "express"
import { CreateProjectInput, GenericResponse } from "../utils/interfaces";
import { deleteProjectById, findProjectById, getProjects, saveNewProject, updateProjectById } from "../services/projectService";
import { getUserByJWT } from "../utils/jwt";
import { Project } from "../entities/Project";
import { User } from "../entities/User";
export const getAllProjects = async (req: Request, res: GenericResponse) => {
    try {
        const projects = await getProjects();
        res.status(200).json({message: "Projects fetched successfully", data: projects});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: "Server Error"});
    }
};
const getUserFromRequest = async (req: Request) => {
    const { authorization } = req.headers;
    if(!authorization)
        return null;
    const token = authorization.split(" ")[1];
    const user = await getUserByJWT(token);
    return user;
}

const initializeProject = (projectInfo: CreateProjectInput, user: User) => {
    const newProject = new Project();
    newProject.title = projectInfo.title;
    if(projectInfo.imgUrl)
        newProject.imgUrl = projectInfo.imgUrl;
    newProject.description = projectInfo.description;
    newProject.daysTillExpiry = projectInfo.daysTillExpiry;
    newProject.user = user;
    return newProject;
}
export const createProject = async (req: Request<{}, {}, CreateProjectInput>, res: GenericResponse) => {
    try{
        const { title, imgUrl, description, daysTillExpiry } = req.body;
        const { authorization } = req.headers;
        if(!title){
            res.status(400).json({message: "title is required"});
            return;
        }
        if(!description){
            res.status(400).json({message: "description is required"});
            return;
        }
        if(!authorization){
            res.status(401).json({message: "You are not authorized to make this request"});
            return;
        }
        const user = await getUserFromRequest(req);
        if(!user){
            res.status(400).json({message: "User not found"});
            return;
        }
        const newProject = initializeProject({title, imgUrl, description, daysTillExpiry}, user);
        const savedProject = await saveNewProject(newProject);

        res.status(201).json({message: "Project created successfully", data: savedProject, test: savedProject.user});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
};

export const getProject = async (req: Request, res: GenericResponse) => {
    try{
        const { id } = req.params;
        const project = await findProjectById(id);
        if (project)
            res.status(200).json({message: "Project found", data: project});
        else{
            res.status(404).json({message: "Project not found"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
};

export const updateProject = async (req: Request, res: GenericResponse) => {
    try {
        const { id } = req.params;
        const { title, imgUrl, description, daysTillExpiry, backers } = req.body;
        const updatedProject = await updateProjectById(id, { title, imgUrl, description, daysTillExpiry, backers });
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