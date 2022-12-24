import express from "express"
import { getAllUsers, loginUserHandler, refreshAccessTokenHandler, registerUserHandler } from "../controllers/userController";
import { requireAuth } from "../middleware/requireAuth";
const userRouter = express.Router();

userRouter.post("/register", registerUserHandler);
userRouter.post("/login", loginUserHandler);
userRouter.get("/refresh", refreshAccessTokenHandler);
userRouter.get("/", requireAuth, getAllUsers);
export default userRouter;