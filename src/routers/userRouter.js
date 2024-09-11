import { Router } from "express"
import { getUser, addUser, loginUser } from "../controllers/userController.js"

export const userRouter = Router()

userRouter.get('/', getUser)
userRouter.post('/', addUser)
userRouter.post('/login', loginUser)