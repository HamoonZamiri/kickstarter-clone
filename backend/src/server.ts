import express from "express";
import project_router from "./routes/project_routes";
import { MONGO_URI, PORT } from "./utils/config";
import mongoose from "mongoose";

const app:express.Application = express();
app.use(express.json());

app.use("/api/projects", project_router);

try {
    mongoose.connect(`${MONGO_URI}`).then()
} catch(error){
    console.log(error);
}
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});