import Router from 'express'
import { addTask, updateStatusTask, getAllTaskByBoard } from '../controllers/TaskController'
export const taskRouter = Router()

taskRouter
    .post('/', addTask)
    .put('/:id', updateStatusTask)
    .get('/:board_id', getAllTaskByBoard)