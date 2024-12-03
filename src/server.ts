import express from 'express' 
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { env } from './utils/schemas/envSchema'

import authRouter from './routers/authRouter'
import userRouter from './routers/userRouter'
import listRouter from './routers/listRouter'
import labelRouter from './routers/labelRouter'
import taskRouter from './routers/taskRouter'
import errorHandler from './middleware/errorHandler'

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Credentials'],
    credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => { res.status(200).json({ message: 'Welcome to API'}) })

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/list', listRouter)
app.use('/task', taskRouter)
app.use('/label', labelRouter)

app.use(errorHandler)

app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`)
})