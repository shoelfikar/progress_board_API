import { Request, Response } from 'express'
import { object, string, number } from 'joi'
import { createTask, updateTask, getTask, getTaskByBoard } from '../models/TaskModel'

export const addTask = async (req:Request, res:Response)=> {
    try {
        const { board_id, task_name, description } =  req.body
        const schema = object().keys({
            board_id: number().required(),
            task_name: string().trim().min(5).required(),
        })
        const {error, value} = schema.validate(req.body)
        if(!error){
            const data = await createTask(parseInt(board_id), task_name, description)
            if(data){
                return res.status(201).json({
                    "message": "Task has been created!",
                })
            }
        }else{
            return res.status(400).json({
                "message": error.details[0].message,
            })
        }
    } catch (error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}


export const updateStatusTask = async (req:Request, res:Response)=> {
    try {
        const id = req.params.id
        const { progress } = req.body
        const schema = object().keys({
            progress: string().trim().valid('todo', 'on_progress', 'done').required(),
        })
        const {error, value} = schema.validate(req.body)
        const task = await getTask(parseInt(id))
        if(!task){
            return res.status(404).json({
                "message": "Data task not found",
            })
        }
        const data = await updateTask(progress, parseInt(id))
        if(data){
            return res.status(200).json({
                "message": "Task has been updated!",
                "task_name": task.rows[0].task_name,
                "progress": progress
            })
        }
    } catch (error) {
        return res.status(500).json({
            "message": "Internal server error",
            "error": error.message
        })
    }
}


export const getAllTaskByBoard = async (req:Request, res: Response)=> {
    try {
        const board_id = req.params.board_id
        const data = await getTaskByBoard(parseInt(board_id))
        if(data.rows.length == 0){
            return res.status(404).json({
                "message": "Data task not found",
            })
        }
        return res.status(200).json({
            "message": "Data Task By Board and user!",
            "data": data.rows
        })
    } catch (error) {
        return res.status(500).json({
            "message": "Internal server error",
            "error": error.message
        })
    }
}