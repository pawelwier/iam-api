import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { makeConnection } from './db/connection.js'
import { userRouter } from './routers/userRouter.js'

dotenv.config()

const {
  PORT, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_NAME
} = process.env
const app = express()
const port = PORT || 4040

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@test.fdk5v31.mongodb.net/${MONGO_DB_NAME}`

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