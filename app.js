import 'dotenv/config'
import express from 'express'
import { registryRoute } from './routes/serviceRegistry.js'

const { PORT } = process.env
const app = express()

app.use(registryRoute)

const server = app.listen(PORT, () => {
  const { address } = server.address()
  const host = address === '::' ? 'localhost' : address
  console.log(`Server listening at http://${host}:${PORT}`)
})
