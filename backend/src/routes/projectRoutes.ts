import express from "express";
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../controllers/projectController";

const projectRouter: express.Router = express.Router();
//get all projects
projectRouter.route("/").get(getProjects).post(createProject);
projectRouter.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

export default projectRouter;