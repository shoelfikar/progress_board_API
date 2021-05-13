import { createUser, checkUser } from '../models/UserModel'
import { Request, Response } from 'express'
import { genSaltSync,compareSync,hashSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { object, string } from 'joi'

export const register = async (req: Request, res: Response)=> {
    try {
        const { username, password, email } = req.body
        const schema = object().keys({
            username: string().trim().required(),
            email: string().trim().email().required(),
            password: string().trim().min(3).required()
        })
        const {error, value} = schema.validate(req.body)
        if(!error){
            const salt = genSaltSync(10)
            const payload = {
                username,
                password: hashSync(password, salt),
                email
            }
            const data = await createUser(payload.username, payload.password, payload.email)
            if(data){
                console.log(data)
                return res.status(201).json({
                    "message": "Register success!",
                    "token": sign({id: data.rows[0].id ,username: username, email: email}, `${process.env.SECRET_KEY}`)
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


export const login = async (req:Request, res:Response)=> {
    try {
        const { email, password} = req.body
        const schema = object().keys({
            email: string().trim().email().required(),
            password: string().trim().min(3).required()
        })
        const {error, value} = schema.validate(req.body)
        if(!error){
            const data = await checkUser(email)
            if(!data){
                return res.status(404).json({
                    "message": "User not found!",
                })
            }
            const auth = compareSync(password, data.rows[0].password)
            const token = sign({id: data.rows[0].id, username: data.rows[0].username, email: data.rows[0].email}, `${process.env.SECRET_KEY}`)
            if(!auth){
                return res.status(401).json({
                    "message": "Wrong Password",
                }) 
            }
            return res.status(200).json({
                "message": "Login Success",
                "token": token,
                "username": data.rows[0].username,
                "email": data.rows[0].email
            })
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