const Theater = require('../models/theater')
const Movie = require('../models/movie')

const createTheater = async (req, res) => {
    try {
        const { theater_name, description } = req.body
        if(!(theater_name)){
            res.status(400).send('All input is required')
            return;
        }

        // default seats format for all theater
        const seats = [{
            seat_type: 'PREMIUM',
            price: 500,
            rows: ['A', 'B'],
            column: ["1","2","3","4","5","6","7","8"]
            },
            {
            seat_type: 'NORMAL',
            price: 300,
            rows: ['C', 'D'],
            column: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
            }
        ]
        const theater = await Theater.create({
            theater_name,
            description,
            seats
        })

        res.status(200).json(theater)
    } catch (error) {
        console.log(error)
    }
}

const getAllTheater = async (req, res) => {
    try {
        res.status(200).json(await Theater.find())
    } catch (error) {
        console.log(error)
    }
}

const getTheaterByID = async (req, res) => {
    try {
        const { _theaterID } = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!_theaterID){
            res.status(400).send("All input is required")
            return;
        }

        const theater = await Theater.findOne({_id: _theaterID})
        if(theater){
            res.status(200).json(theater)
        }else{
            res.status(400).send('Theater not found')
        }
    } catch (error) {
        console.log(error)
    }
}

const getTheaterByName = async (req, res) => {
    try {
        const { theater_name } = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!theater_name){
            res.status(400).send("All input is required")
            return;
        }

        const theater = await Theater.findOne({theater_name})
        if(theater){
            res.status(200).json(theater)
        }else{
            res.status(400).send('Theater not found')
        }
    } catch (error) {
        console.log(error)
    }
}

const editTheaterByID = async (req, res) => {
    try {
        const { _theaterID ,theater_name, description } = req.body
        if(!_theaterID){
            res.status(400).send('_theaterID is required')
            return;
        }

        const oldTheater = await Theater.findOne({_id: _theaterID})
        if(!oldTheater){
            res.status(400).send('Theater not found')
            return;
        }
        const theater = await Theater.findOneAndUpdate(
            {_id: _theaterID},
            {
                theater_name,
                description
            },
            {new: true}
        )
        res.status(200).json(theater)
    } catch (error) {
        console.log(error)
    }
}

const deleteTheaterByID = async (req, res) => {
    try {
        const { _theaterID } = req.query
        if(!_theaterID){
            res.status(400).send('_theaterID is required')
            return;
        }

        const theater = await Theater.findOneAndDelete({_id: _theaterID})
        if(theater){
            res.status(200).json(theater)
        }else{
            res.status(400).send("Theater not found")
        }

    } catch (error) {
        console.log(error)
    }
}

const createMovie = async (req, res) => {
    try {
        const { movie_name, genre, movie_status, movie_duration, description, movie_image } = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!(movie_name && genre && movie_duration )){
            res.status(400).send("Required input is missing")
            return;
        }

        const movie = await Movie.create({
            name:movie_name,
            genre,
            status: movie_status,
            duration: movie_duration,
            description,
            image: movie_image
        })

        res.status(200).json(movie)
    } catch (error) {
        console.log(error)
    }
}

const getAllMovie = async (req, res) => {
    try {
        res.status(200).json(await Movie.find())
    } catch (error) {
        console.log(error)
    }
}

const getMovieByID = async (req, res) => {
    try {
        const { _movieID } = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!_movieID){
            res.status(400).send('All input is required')
            return;
        }

        const movie = await Movie.findOne({_id: _movieID})
        if(movie){
            res.status(200).json(movie)
        }else{
            res.status(400).send('Movie not found')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const getMovieByName = async (req, res) => {
    try {
        const { movie_name } = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!movie_name){
            res.status(400).send('All input is required')
            return;
        }

        const movie = await Movie.findOne({name: movie_name})
        if(movie){
            res.status(200).json(movie)
        }else{
            res.status(400).send('Movie not found')
        }
    } catch (error) {
        console.log(error)
    }
}

const editMovieByID = async (req, res) => {
    try {
        const { _movieID ,movie_name, genre, movie_status, movie_duration, description, movie_image } = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!_movieID){
            res.status(400).send('_movieID is required')
            return;
        }

        const oldMovie = await Movie.findOne({_id:_movieID})
        if(!oldMovie){
            res.status(400).send('Movie not found')
            return;
        }

        const movie = await Movie.findOneAndUpdate( {_id:_movieID} ,{
            name:movie_name,
            genre,
            status: movie_status,
            duration: movie_duration,
            description,
            image: movie_image
        }, {new: true})

        res.status(200).json(movie)
    } catch (error) {
        console.log(error)
    }
}

const deleteMovieByID = async (req, res) => {
    try {
        // console.log(req)
        const { _movieID } = req.query
        if(!_movieID){
            res.status(400).send('_movieID is required')
            return;
        }

        const movie = await Movie.findOneAndDelete({_id: _movieID})
        if(movie){
            res.status(200).json(movie)
        }else{
            res.status(400).send("Movie not found")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllMovie,
    getMovieByID,
    getMovieByName,
    createMovie,
    editMovieByID,
    deleteMovieByID,

    getAllTheater,
    getTheaterByID,
    getTheaterByName,
    createTheater,
    editTheaterByID,
    deleteTheaterByID
}