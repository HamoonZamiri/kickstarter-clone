import { DataSource } from "typeorm";
import { Project } from "../entities/Project";
import { User } from "../entities/User";

export const AppDataSource: DataSource = new DataSource ({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "kickstarter",
    entities: [User, Project],
    synchronize: true,
    // migrations: [path.join(__dirname, "./migrations/*")]
});