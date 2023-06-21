const mongoose = require('mongoose')
 
const MONGO_URI = process.env.MONGO_URI

exports.connect = () => {
    
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'booking',
    })
    .then(() => {
        console.log("connected to database BOOKING successfully!")
    })
    .catch((error) => {
        console.log("Error connecting to database BOOKING")
        console.error(error)
        process.exit(1)
    })

}