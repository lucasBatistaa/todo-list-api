import express from 'express' 
import { env } from './utils/schemas/envSchema'

import authRouter from './routers/authRouter'
import userRouter from './routers/userRouter'
import listRouter from './routers/listRouter'
import labelRouter from './routers/labelRouter'
import taskRouter from './routers/taskRouter'
import errorHandler from './middleware/errorHandler'

const app = express()

app.get('/', (req, res) => { res.status(200).json({ message: 'Welcome to API'}) })

app.use(express.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/list', listRouter)
app.use('/task', taskRouter)
app.use('/label', labelRouter)

app.use(errorHandler)

app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`)
})