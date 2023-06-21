const mongoose = require('mongoose')
 
const MONGO_URI = process.env.MONGO_URI

exports.connect = () => {
    
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'showtime',
    })
    .then(() => {
        console.log("connected to database SHOWTIME successfully!")
    })
    .catch((error) => {
        console.log("Error connecting to database SHOWTIME")
        console.error(error)
        process.exit(1)
    })

}