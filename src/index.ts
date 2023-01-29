import express from 'express'
import router from './routes/index.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const server = express()

server.use(express.json())
server.use(cors())
server.use(router)

const port = 5000 || process.env.PORT

server.listen(port, () => console.log(`Server running on port ${port}`))