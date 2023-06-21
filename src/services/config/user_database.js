const mongoose = require('mongoose')
 
const MONGO_URI  = process.env.MONGO_URI

exports.connect = () => {
    
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'user',
    })
    .then(() => {
        console.log("connected to database USER successfully!")
    })
    .catch((error) => {
        console.log("Error connecting to database USER")
        console.error(error)
        process.exit(1)
    })

}