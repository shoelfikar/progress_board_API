import { Request, Response } from 'express'
import { object, string, number } from 'joi'
import { createBoard, getBoards, getBoardById} from '../models/BoardModel'


export const addBoard = async (req:Request, res:Response)=> {
    try {
        const { board_name, description} = req.body
        const user_id = (<any>req).user.id
        const schema = object().keys({
            board_name: string().trim().min(5).required(),
            description: string()
        })
        const {error, value} = schema.validate(req.body)
        if(!error){
            const data = await createBoard(parseInt(user_id), board_name, description)
            if(data){
                return res.status(201).json({
                    "message": "Board has been created!",
                })
            }
        }else{
            return res.status(400).json({
                "message": error.details[0].message,
            })
        }
    } catch (error) {
        return res.status(500).json({
            "message": "Internal server error",
            "error": error.message
        })
    }
}


export const getAllBoards = async (req:Request, res:Response)=> {
    try {
        const data  = await getBoards()
        if(data.rows.length == 0){
            return res.status(404).json({
                "message": "Data board not found",
            })
        }

        return res.status(200).json({
            "message": "Data all boards",
            "data": data.rows
        })
    } catch (error) {
        return res.status(500).json({
            "message": "Internal server error",
            "error": error.message
        })
    }
}


export const getById = async (req:Request, res:Response)=> {
    try {
        const id = req.params.id
        const data = await getBoardById(parseInt(id))
        if(data.rows.length == 0){
            return res.status(404).json({
                "message": "Data board not found",
            })
        }

        return res.status(200).json({
            "message": "Data all boards",
            "data": data.rows
        })
    } catch (error) {
        return res.status(500).json({
            "message": "Internal server error",
            "error": error.message
        })
    }
}