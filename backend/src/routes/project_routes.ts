import express from "express";
import { createProject, deleteProject, getProject, getProjects } from "../controllers/project_controller";

const project_router:express.Router = express.Router();
//get all projects
project_router.get("/", getProjects);

project_router.post("/", createProject);

project_router.get("/:id", getProject);

project_router.delete("/:id", deleteProject);

export default project_router;