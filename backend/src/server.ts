import express from "express";
import project_router from "./routes/project_routes";
import { PORT } from "./utils/config";
import { DataSource } from "typeorm"

const app: express.Application = express();
app.use(express.json());

app.use("/api/projects", project_router);

const AppDataSource: DataSource = new DataSource ({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres"
});

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

//mongosh 'mongodb+srv://cluster0.example.com/testdb!!!!!!!!!?authSource=$external&authMechanism=MONGODB-AWS'