import connect from '../db'
import { QueryResult } from 'pg'


export const createTask = async (board_id:Number, task_name:string, description:string)=> {
    const response: QueryResult = await connect.pool.query("INSERT INTO task(board_id, task_name, description) VALUES($1, $2, $3)", [board_id, task_name, description])
    return response
}


export const updateTask = async (progress:string, id:Number)=> {
    const response: QueryResult = await connect.pool.query("UPDATE task SET progress = $1 WHERE task.id = $2", [progress, id])
    return response
}

export const getTask = async (id:Number)=> {
    const response: QueryResult = await connect.pool.query("SELECT * FROM task WHERE id = $1", [id])
    return response
}

export const getTaskByBoard = async (board_id:Number)=> {
    const response: QueryResult = await connect.pool.query("SELECT task.*, board.board_name, users.username, users.email FROM task INNER JOIN board ON task.board_id = board.id INNER JOIN users ON board.user_id = users.id WHERE task.board_id = $1", [board_id])
    return response
}