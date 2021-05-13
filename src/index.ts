require('dotenv').config();
import express from 'express'
import cors from 'cors'
import connect from './db'
import router from './routers'
const app = express()


// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api/v1.0',router)


const port = process.env.PORT || 3000

app.listen(port, ()=> {
    connect.runMigrations()
    console.log(`Server running on port ${port}`)
})