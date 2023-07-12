// const {v4} = require('uuid')
const axios = require('axios')

const getAllMovie = async () => {
    try {
        const movies = await axios.get('http://entity_service:4003/getallmovie')
                .catch(err => {
                    console.log(err)
        })
        let response = []
        response = movies.data.filter(movie =>{return movie.status ==='ACTIVE'}).map(movie => {
            return {
                _movieID: movie._id,
                movie_name: movie.name,
                description: movie.description,
                movie_duration: movie.duration,
                genres: movie.genre,
                movie_image: movie.image
            }
        })
        return {data: response}
    } catch (error) {
        console.log(error)
    }
}

const getMovieByID = async (input) => {
    try {
        const movieResponse = await axios.get('http://entity_service:4003/getmoviebyid', {params:{
            _movieID: input
            }}) 
            .catch(err => {
                console.log(err)
        })

        return {
            _movieID: movieResponse.data._id,
            movie_name: movieResponse.data.name,
            description: movieResponse.data.description,
            movie_duration: movieResponse.data.duration,
            genres: movieResponse.data.genre,
            movie_image: movieResponse.data.image
        }
    } catch (error) {
        console.log(error)
    }
}

const createMovie = async (input) => {
    try {
        const createResponse = await axios.post('http://entity_service:4003/createmovie', {
                movie_name : input.movie_name, 
                genre : input.genre, 
                movie_status: input.movie_status, 
                movie_duration: input.movie_duration,
                description: input.description,
                movie_image: input.movie_image
        })

        return{
            httpCode: createResponse.status,
            message: createResponse.statusText
        }
    } catch (error) {
        console.log(error)
    }
}

const editMovieByID = async(input) => {
    try {
        const editResponse = await axios.put('http://entity_service:4003/editmoviebyid', {
            _movieID: input._movieID,
            movie_name : input.movie_name, 
            genre : input.genre, 
            movie_status: input.movie_status, 
            movie_duration: input.movie_duration,
            description: input.description,
            movie_image: input.movie_image
            })
        .catch(err => {
            console.log(err)
        })

        return{
            httpCode: editResponse.status,
            message: editResponse.statusText
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllMovie,
    getMovieByID,
    createMovie,
    editMovieByID
}