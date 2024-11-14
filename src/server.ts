import express from 'express' 
import { env } from './utils/schemas/envSchema'

import listRouter from './routers/listRouter'
import userRouter from './routers/userRouter'
import authRouter from './routers/authRouter'
import labelRouter from './routers/labelRouter'
import errorHandler from './middleware/errorHandler'

const app = express()

app.get('/', (req, res) => { res.status(200).json({ message: 'Welcome to API'}) })

app.use(express.json())

app.use('/list', listRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/label', labelRouter)

app.use(errorHandler)

app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`)
})