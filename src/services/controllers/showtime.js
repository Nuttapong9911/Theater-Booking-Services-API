const Showtime = require('../models/showtime')
const axios = require('axios')

const getShowtimeByID = async(req, res) => {
    try {
        const { _showID } = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!_showID){
            res.status(400).send("All input is required")
            return;
        }

        const showtime = await Showtime.findOne({_id: _showID})
        if(showtime){

            res.status(200).json(showtime)
        }else{
            res.status(400).send("showtime not found")
        }
    } catch (error) {
        console.log(error)
    }
}

const createShowtime = async(req, res) => {
    try {
        const {_movieID, datetime_start, datetime_end, _theaterID} = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!(_movieID && datetime_start && datetime_end && _theaterID)){
            res.status(400).send("All input is required")
            return;
        }
        const movie = await axios.get('http://entity_service:4003/getmoviebyid', {params: {_movieID}})
            .catch(err => {
                console.log(err)
            })
        const theater = await axios.get('http://entity_service:4003/gettheaterbyid', {params: {_theaterID}})
            .catch(err => {
                console.log(err)
            })
            
        if(!(movie && theater)){
            res.status(400).send("movie or theater do not exist")
            return;
        }
        
        const new_datetime_start = new Date(datetime_start)
        const new_datetime_end = new Date(datetime_end)

         // - check if invalid datetime or showtime's datetime is more than movie duration
        const datetime_diff = (new_datetime_end.getTime() - new_datetime_start.getTime())/60000
        if( (datetime_diff <=0) || (datetime_diff < movie.data.duration) ){
            res.status(400).send("showtime datetime invalid")
            return;
        }

        const showtime = await Showtime.create({
            _movieID,
            datetime_start: new_datetime_start,
            datetime_end: new_datetime_end,
            _theaterID
        })
        res.status(200).json(showtime)
    } catch (error) {
        console.log(error)
    }
}

const editShowtimeByID = async(req, res) => {
    try {
        const {_showID ,_movieID, datetime_start, datetime_end, _theaterID} = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!_showID){
            res.status(400).send('_showID is required')
            return;
        }

        const oldShowtime = await Showtime.findOne({_id: _showID})
        if(oldShowtime){
            const movie = await axios.get(
                'http://entity_service:4003/getmoviebyid',
                {params: {_movieID}}
            )
            const new_datetime_start = datetime_start? new Date(datetime_start) : oldShowtime.datetime_start
            const new_datetime_end = datetime_end? new Date(datetime_end): oldShowtime.datetime_end

            // - check if invalid datetime or showtime's datetime is more than movie duration
            const datetime_diff = (new_datetime_end.getTime() - new_datetime_start.getTime())/60000
            if( !((datetime_diff > 0) && (datetime_diff >= movie.data.duration)) ){
                res.status(400).send("showtime datetime invalid")
                return;
            }

            const showtime = await Showtime.findOneAndUpdate(
                {_id:_showID} ,
                {
                    _movieID,
                    datetime_start: new_datetime_start,
                    datetime_end: new_datetime_end,
                    _theaterID
                }, 
                {new:true}
            )
            res.status(200).json(showtime)
        }else{
            res.status(400).send('Showtime not found')
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteShowtimeByID = async (req, res) => {
    try {
        const {_showID } = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!_showID){
            res.status(400).send("All input is required")
            return;
        }

        const showtime = await Showtime.findOneAndDelete({_id:_showID})
        if(showtime){
            res.status(200).json(showtime)
        }else{
            res.status(400).send('Showtime not found')
        }
    } catch (error) {
        console.log(error)
    }
}

const getShowtimeByDate = async (req, res) => {
    try {
        
        const { datetime_start } = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!datetime_start){
            res.status(400).send("All input is required")
            return
        }

        const dateStartObj = new Date((new Date(`${datetime_start} GMT+07:00`)).toDateString())
        const dateEndObj = new Date(dateStartObj.getTime() + 24*60*60*1000)
        // console.log(dateStartObj)
        const showtimes = await Showtime.find({
            "$and": [
                {datetime_start: {"$gte": dateStartObj}},
                {datetime_start: {"$lt": dateEndObj}}
            ]
        })
        
        if(!showtimes){
            res.status(400).send("Showtime not found")
            return;
        }
        res.status(200).json(showtimes)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getShowtimeByID,
    createShowtime,
    editShowtimeByID,
    deleteShowtimeByID,
    getShowtimeByDate
}