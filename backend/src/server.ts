import express, { Application } from "express";
import { project_router } from "./routes/project_routes";
import { PORT } from "./utils/config";

const app:Application = express();
app.use(express.json());

app.use("/api/projects", project_router);
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});