require('dotenv').config();
require('./services/config/user_database').connect();

const express = require('express')
const cookieParser = require('cookie-parser')
const userRoute = require('./services/routes/user')

const app = express()
const AUTH_PORT = process.env.AUTH_PORT

app.use(express.json())
app.use(cookieParser())
app.use(userRoute)


app.listen(AUTH_PORT, () => {
  console.log(`AUTH SERVICE listening on port ${AUTH_PORT}`)
})