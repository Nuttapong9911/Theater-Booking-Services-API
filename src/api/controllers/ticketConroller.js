const axios = require('axios')

const getBookedSeats = async (input) => {
    try {
        const response = await axios.get('http://booking_service:4004/getticketbyshowtime', {params:{
                _showID: input._showID
            }})
            .catch(err => {
                console.log(err)
        })
        return {data: response.data}
    } catch (error) {
        console.log(error)
    }
}

const createTicket = async (input) => {
    try {
        const user = await axios.get('http://auth_service:4001/getuserbyid', {params:{
            _userID: input._userID
        }})    

        if (user.data.account < input.price){
            return {
                httpCode: "400",
                message: "not enough money",
            }
        }

        const ticketResponse = await axios.post('http://booking_service:4004/createticket', {
            _userID : input._userID,
            _showID : input._showID,
            seat_type: input.seat_type,
            row: input.row,
            column : input.column
        })

        const userResponse = await axios.put('http://auth_service:4001/updateuserbyid', {
            _userID : input._userID,
            account : user.data.account - input.price
        })
        return {
            httpCode: "200",
            message: "ok",
            userAccount: userResponse.data.account,
            refCode : ticketResponse.data.reference_code
        }
        
    } catch (error) {
        return {
            httpCode: error.response.status,
            message: error.response.data
        }
    }
}

const createMultipleTickets = async (input) => {
    try {
        const user = await axios.get('http://auth_service:4001/getuserbyid', {params:{
            _userID: input._userID
        }})  
        let totalPrice = 0
        for (const seat of input.orderedSeats){
            totalPrice += seat.price
        }

        if (user.data.account < totalPrice){
            return {
                httpCode: "400",
                message: "not enough money :(",
            }
        }
        console.log('pass account check condition')
        const response = []

        for (const seat of input.orderedSeats){
            const ticketResponse = await createTicket({
                _userID : input._userID,
                _showID : input._showID,
                seat_type: seat.seat_type,
                row: seat.row,
                column : seat.column,
                price: seat.price
            })
            if (ticketResponse.httpCode !== 200){
                return {
                    httpCode: ticketResponse.httpCode,
                    message: ticketResponse.message,
                    userAccount: 0,
                    refCode : []
                }
            }
            response.push(ticketResponse)
        }
        return {
            httpCode: "200",
            message: "ok",
            userAccount: response[response.length-1].userAccount,
            refCode : response.map((res) => {return res.refCode})
        }

    } catch (error) {
        console('catch error', error)
        return {
            httpCode: error.response.status,
            message: error.response.data
        }
    }
}

const getInfoFromRef = async (input) => {
    try {
        const ticketResponse = await axios.get('http://booking_service:4004/getticketbyrefcode', {params:{
            reference_code: input.reference_code
        }})

        const showtimeResponse = await axios.get('http://showtime_service:4002/getshowtimebyid', {params:{
            _showID: ticketResponse.data._showID
        }})

        const movieResponse = await axios.get('http://entity_service:4003/getmoviebyid', {params:{
            _movieID: showtimeResponse.data._movieID
        }})

        const theaterResponse = await axios.get('http://entity_service:4003/gettheaterbyid', {params:{
            _theaterID: showtimeResponse.data._theaterID
        }})
        
        return {
            movie_name: movieResponse.data.name,
            movie_image: movieResponse.data.image,
            datetime_start: showtimeResponse.data.datetime_start,
            datetime_end: showtimeResponse.data.datetime_end,
            theater_name: theaterResponse.data.theater_name,
            ticket_status: ticketResponse.data.status,
            seat_type: ticketResponse.data.seat_type,
            row: ticketResponse.data.row,
            column: ticketResponse.data.column
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getBookedSeats,
    createTicket,
    createMultipleTickets,
    getInfoFromRef
}