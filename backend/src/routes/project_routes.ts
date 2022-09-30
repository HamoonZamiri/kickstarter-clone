import express, { Router, Request, Response } from "express";

export const project_router: Router = express.Router();
//get all projects
project_router.get("/", (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({"message": "get all projects"});
})

project_router.post("/", (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({"message": "post new projects"});
})

project_router.get("/:id", (req: Request, res: Response) => {
    res.status(200).json({"message": `get project with id ${req.params.id}`});
})

project_router.delete("/:id", (req: Request, res: Response) => {
    res.status(200).json({"message": `delete project with id ${req.params.id}`});
})