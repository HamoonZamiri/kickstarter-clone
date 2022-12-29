import express from "express";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/projectController";
import { requireAuth } from "../middleware/requireAuth";

const projectRouter: express.Router = express.Router();
//get all projects
projectRouter.post("/", requireAuth, createProject);
projectRouter.route("/").get(getAllProjects);
projectRouter.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

export default projectRouter;