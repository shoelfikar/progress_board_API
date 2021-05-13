import { Router } from 'express'
import { userRouter } from './user'
import { boardRouter} from './board'
import { taskRouter} from './task'
import { verifyToken } from '../middleware'
const router = Router()


router.use('/user', userRouter)
router.use('/board',verifyToken, boardRouter)
router.use('/task',verifyToken, taskRouter)
router.get('/', (req, res)=> {
    const result = {
        "message": "Progres Board API",
        "version": "1.0.0",
        "author": "Sulfikardi"
    }
    res.status(200).send(result)
})

export default router