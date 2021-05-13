import connect from '../db'
import { QueryResult } from 'pg'

export const createUser = async (username:string, password:string, email:string)=> {
    const response: QueryResult = await connect.pool.query("INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING id", [username, password, email])
    return response
}

export const checkUser = async (email:string)=> {
    const response: QueryResult = await connect.pool.query("SELECT * FROM users WHERE email = $1", [email])
    return response
}
