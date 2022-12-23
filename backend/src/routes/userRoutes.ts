import express from "express"
import { loginUserHandler, refreshAccessTokenHandler, registerUserHandler } from "../controllers/userController";
const userRouter = express.Router();

userRouter.post("/register", registerUserHandler);
userRouter.post("/login", loginUserHandler);
userRouter.get("/refresh", refreshAccessTokenHandler);
export default userRouter;