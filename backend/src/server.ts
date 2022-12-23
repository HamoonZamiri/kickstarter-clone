require("dotenv").config();
import express from "express";
import projectRouter from "./routes/projectRoutes";
import { PORT } from "./utils/config";
import userRouter from "./routes/userRoutes";
import { AppDataSource } from "./utils/dataSource";

AppDataSource.initialize()
    .then(async () => {
        const app: express.Application = express();
        app.use(express.json());

        //routes
        app.use("/api/projects", projectRouter);
        app.use("/api/users", userRouter);
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });

    })
    .catch((error) => console.log(error));

//mongosh 'mongodb+srv://cluster0.example.com/testdb!!!!!!!!!?authSource=$external&authMechanism=MONGODB-AWS'