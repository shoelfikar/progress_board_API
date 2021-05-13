import { Router } from 'express'
import { register, login } from '../controllers/UserController'
export const userRouter = Router()


userRouter
    .post('/auth/register', register)
    .post('/auth/login', login)

