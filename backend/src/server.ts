import express from "express";
import project_router from "./routes/projectRoutes";
import { PORT } from "./utils/config";
import { DataSource } from "typeorm"
import { Project } from "./entities/Project";

const app: express.Application = express();
app.use(express.json());

app.use("/api/projects", project_router);

export const AppDataSource: DataSource = new DataSource ({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "kickstarter",
    entities: [Project],
    synchronize: true,
    // migrations: [path.join(__dirname, "./migrations/*")]
});
AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });

    })
    .catch((error) => console.log(error));

//mongosh 'mongodb+srv://cluster0.example.com/testdb!!!!!!!!!?authSource=$external&authMechanism=MONGODB-AWS'