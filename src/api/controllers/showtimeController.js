const axios = require('axios')

const getShowtimeByID = async (input) => {
    try {
        if(!input) return null
        let response = await axios.get('http://showtime_service:4002/getshowtimebyid', {params:{
            _showID: input._showID
        }})

        if(!response?.data) return null
        const movies = await axios.get('http://entity_service:4003/getallmovie')
        const theaters = await axios.get('http://entity_service:4003/getalltheater')

        const movie = movies.data.find((m) => {return response.data._movieID === m._id})
        const theater = theaters.data.find((t) => {return response.data._theaterID === t._id})

        return {showtime: { ...response.data, 
            _showID:response.data._id, 
            movie_name: movie.name,
            movie_image: movie.image, 
            theater_name:theater.theater_name,
            theater_seats: theater.seats
        }}
    } catch (error) {
        console.log(error)
    }
}

const getShowtimeByDate = async (searchInput) => {
    try {
        if(!searchInput){
            return null
        }
        let response = await axios.get('http://showtime_service:4002/getshowtimebydate', {params:{
            datetime_start: searchInput.date_search
            }})
            .catch(err => {
                console.log(err)
        })
        if(!response?.data){
            return null
        }

        const movies = await axios.get('http://entity_service:4003/getallmovie')
        const theaters = await axios.get('http://entity_service:4003/getalltheater')

        let movienames = []
        const mapResponse = await response.data.map((elem) => {
            const movie = movies.data.find((m) => {return elem._movieID === m._id})
            if(movienames.indexOf(movie.name) === -1){
                movienames.push(movie.name)
            }
            const theater = theaters.data.find((t) => {return elem._theaterID === t._id})
            return { ...elem, 
                _showID:elem._id,
                movie_name: movie.name, 
                movie_image: movie.image, 
                theater_name:theater.theater_name,
                theater_seats: theater.seats
            }
        })

        return {showtimes: mapResponse, movienames}

    } catch (error) {
        console.log(error)
    }
}

const deleteShowtimeByID = async (input) => {
    try {
        const deleteReponse = await axios.delete('http://showtime_service:4002/deleteshowtimebyid', {params:{
            _showID: input._showID
            }})
            .catch(err => {
                console.log(err)
        })

        if(!deleteReponse){
            return{
                httpCode: "400",
                message: "No response"
            }
        }
        return{
            httpCode: deleteReponse.status,
            message: deleteReponse.statusText
        }
    } catch (error) {
        console.log(error)
    }
}

const editShowtimeByID = async (input) => {
    try {
        const movieResponse = await axios.get('http://entity_service:4003/getmoviebyname', {params:{
                movie_name: input.movie_name
            }})
            .catch(err => {
                console.log(err)
        })

        const theaterResponse = await axios.get('http://entity_service:4003/gettheaterbyname', {params:{
            theater_name: input.theater_name
            }})
            .catch(err => {
                console.log(err)
        })

        const editShowtimeResponse = await axios.put('http://showtime_service:4002/editshowtimebyid', {
            _showID : input._showID ,
            _movieID : movieResponse?.data._id, 
            datetime_start : input.datetime_start, 
            datetime_end : input.datetime_end, 
            _theaterID : theaterResponse?.data._id
            })
            .catch(err => {
                console.log(err)
        })

        if(input.editedSeats.length > 0){
            input.editedSeats.forEach( async (element) => {
                const editTicketResponse = await axios.put('http://booking_service:4004/editticketbyshowtimeandpos', {
                    _showID : input._showID ,
                    row: element.row,
                    column: element.column,
                    status: element.status
                })
                .catch(err => {
                    console.log(err)
                })
            });
        }

        return {
                httpCode: "200",
                message: "OK"
        }
    } catch (error) {
        console.log(error)
    }
}

const createShowtime = async(input) => {
    try {
        const movieResponse = await axios.get('http://entity_service:4003/getmoviebyname', {params:{
            movie_name: input.movie_name
            }})
            .catch(err => {
                console.log(err)
        })

        const theaterResponse = await axios.get('http://entity_service:4003/gettheaterbyname', {params:{
            theater_name: input.theater_name
            }})
            .catch(err => {
                console.log(err)
        })

        const showtimeResponse = await axios.post('http://showtime_service:4002/createshowtime', {
            _movieID : movieResponse.data._id, 
            datetime_start : input.datetime_start, 
            datetime_end : input.datetime_end, 
            _theaterID : theaterResponse.data._id
            })
            .catch(err => {
                console.log(err)
        })

        return {
            httpCode: showtimeResponse.status,
            message: showtimeResponse.statusText
        }


    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getShowtimeByID,
    getShowtimeByDate,
    deleteShowtimeByID,
    editShowtimeByID,
    createShowtime
}