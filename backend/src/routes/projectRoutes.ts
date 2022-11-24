import express from "express";
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../controllers/projectController";

const project_router: express.Router = express.Router();
//get all projects
project_router.route("/").get(getProjects).post(createProject);
project_router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

export default project_router;