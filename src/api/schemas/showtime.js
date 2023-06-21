const showtimeController = require('../controllers/showtimeController')

const typeDefs = `#graphql
    type Seat {
        seat_type: String
        price: Int
        rows: [String]
        column: [String]
    }

    type Showtime {
        _showID: String
        _movieID: String!
        movie_name: String
        movie_image: String
        datetime_start: String
        datetime_end: String
        _theaterID: String!
        theater_name: String
        theater_seats: [Seat]
    }

    input GetShowtimeByIDInput {
        _showID: String
    }

    type GetShowtimeByIDPayload {
        showtime: Showtime
    }

    input SearchInput {
        date_search: String
    }

    type SearchPayload {
        showtimes : [Showtime]
        movienames: [String]
    }

    input DeleteShowtimeInput {
        _showID: String
    }

    type DeleteShowtimePayload {
        httpCode: String
        message: String
    }

    input EditedSeat {
        row: String
        column: String
        status: String
    }

    input EditShowtimeInput {
        _showID: String
        movie_name: String
        datetime_start: String
        datetime_end: String
        theater_name: String
        editedSeats: [EditedSeat]
    }

    type EditShowtimePayload {
        httpCode: String
        message: String
    }

    input CreateShowtimeInput{
        movie_name: String
        datetime_start: String
        datetime_end: String
        theater_name: String
    }

    type CreateShowtimePayload {
        httpCode: String
        message: String
    }
    
`

const quries =`#graphql
    getShowtimeByID (input: GetShowtimeByIDInput): GetShowtimeByIDPayload
    getShowtimeByDate (input: SearchInput): SearchPayload 
`

const mutations = `#graphql
    deleteShowtimeByID (input: DeleteShowtimeInput) : DeleteShowtimePayload
    editShowtimeByID (input: EditShowtimeInput) : EditShowtimePayload
    createShowtime (input: CreateShowtimeInput) : CreateShowtimePayload
`

const resolvers = {
    Query: {
        getShowtimeByID: (_, args) => showtimeController.getShowtimeByID(args.input),
        getShowtimeByDate: (_, args) => showtimeController.getShowtimeByDate(args.input)
    },
    Mutation : {
        deleteShowtimeByID : (_, args) => showtimeController.deleteShowtimeByID(args.input),
        editShowtimeByID : (_, args) => showtimeController.editShowtimeByID(args.input),
        createShowtime : (_, args) => showtimeController.createShowtime(args.input)
    }
}

module.exports = {
    typeDefs,
    quries,
    mutations,
    resolvers
}