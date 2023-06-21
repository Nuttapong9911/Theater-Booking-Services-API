require('dotenv').config();
require('./services/config/showtime_database').connect();

const express = require('express')
const cookieParser = require('cookie-parser')
const showtimeRoute = require('./services/routes/showtime')

const app = express()
const SHOWTIME_PORT = process.env.SHOWTIME_PORT

app.use(express.json())
app.use(cookieParser())
app.use(showtimeRoute)


app.listen(SHOWTIME_PORT, () => {
  console.log(`SHOWTIME SERVICE listening on port ${SHOWTIME_PORT}`)
})