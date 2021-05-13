import connect from '../db'
import { QueryResult } from 'pg'


export const createBoard = async (user_id:Number, board_name:string, description:string)=> {
    const response: QueryResult = await connect.pool.query("INSERT INTO board(user_id, board_name, description) VALUES($1, $2, $3)", [user_id, board_name, description])
    return response
}


export const getBoards = async ()=> {
    const response: QueryResult = await connect.pool.query("SELECT board.*, users.username, users.email, task.task_name FROM board INNER JOIN users ON board.user_id = users.id INNER JOIN task ON board.id = task.board_id ORDER BY task.created_at DESC")
    return response
}


export const getBoardById = async (id:Number)=> {
    const response: QueryResult = await connect.pool.query("SELECT board.*, users.username, users.email, task.task_name FROM board INNER JOIN users ON board.user_id = users.id INNER JOIN task ON board.id = task.board_id WHERE board.id = $1 ORDER BY task.created_at DESC", [id])
    return response
}