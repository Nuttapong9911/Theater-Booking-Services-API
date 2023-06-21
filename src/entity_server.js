require('dotenv').config();
require('./services/config/entity_database').connect();

const express = require('express')
const cookieParser = require('cookie-parser')
const entityRoute = require('./services/routes/entity')

const app = express()
const ENTITY_PORT = process.env.ENTITY_PORT

app.use(express.json())
app.use(cookieParser())
app.use(entityRoute)


app.listen(ENTITY_PORT, () => {
  console.log(`ENTITY SERVICE listening on port ${ENTITY_PORT}`)
})