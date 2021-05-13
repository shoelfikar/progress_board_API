import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction} from 'express'

export const verifyToken = (req:Request, res:Response, next:NextFunction)=> {
    const bearerHeader:any = req.headers['authorization'];
    if(!bearerHeader){
        return res.status(401).json({
            message: 'invailid authorozation!'
        })
    }
    const token = bearerHeader.split(' ')[1]
    verify(token, `${process.env.SECRET_KEY}`, (err:any, data:any)=> {
        if(err){
            return res.status(403).json({
                message: 'wrong token!'
            })
        }
        (<any>req).user = data
        next()
    })
}
