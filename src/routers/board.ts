import Router from 'express'
import { addBoard, getAllBoards, getById } from '../controllers/BoardController'
export const boardRouter = Router()


boardRouter
    .post('/', addBoard)
    .get('/', getAllBoards)
    .get('/:id', getById)
