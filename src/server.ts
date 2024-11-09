import express from 'express' 
import { env } from './utils/envSchema'

import listRouter from './routers/listRouter'
import userRouter from './routers/userRouter'

const app = express()

app.get('/', (req, res) => { res.status(200).json({ message: 'Welcome to API'}) })

app.use(express.json())

app.use('/list', listRouter)
app.use('/user', userRouter)

app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`)
})