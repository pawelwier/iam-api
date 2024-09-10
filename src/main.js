import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { makeConnection } from './db/connection.js'
import { userRouter } from './routers/userRouter.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 4040

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@test.fdk5v31.mongodb.net/${process.env.MONGO_DB_NAME}`

makeConnection(uri)

app.use(cors())
app.use(json())

/* Test route */
app.get('/test', (req, res) => {
  console.log('test')
  res.send({ test: 'OK' })
})

app.use('/users', userRouter)

app.listen(port, () => {
  console.log('Server running on port:', port)
})