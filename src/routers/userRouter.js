import { Router } from "express"
import { getUser, addUser } from "../controllers/userController.js"

export const userRouter = Router()

userRouter.get('/', getUser)
userRouter.post('/', addUser)