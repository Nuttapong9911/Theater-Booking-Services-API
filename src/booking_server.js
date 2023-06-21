require('dotenv').config();
require('./services/config/booking_database').connect();

const express = require('express')
const cookieParser = require('cookie-parser')
const bookingRoute = require('./services/routes/booking')

const app = express()
const BOOKING_PORT = process.env.BOOKING_PORT

app.use(express.json())
app.use(cookieParser())
app.use(bookingRoute)

app.listen(BOOKING_PORT, () => {
  console.log(`BOOKING SERVICE listening on port ${BOOKING_PORT}`)
})