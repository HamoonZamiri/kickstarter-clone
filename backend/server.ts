import * as express from "express";
console.log("hello gang");

const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log("listening on port 3000");
})