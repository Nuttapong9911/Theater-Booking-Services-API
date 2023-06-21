const ticketController = require('../controllers/ticketConroller')

const typeDefs = `#graphql
    type BookedSeat {
        seat_type: String
        row: String
        column: String
    }

    input GetBookedSeatsInput {
        _showID: String
    }

    type GetBookedSeatsPayload {
        data: [BookedSeat]
    }

    input OrderedSeat {
        seat_type: String!
        row: String
        column: String
        price: Int
    }

    input CreateTicketInput {
        _userID : String!
        _showID : String!
        orderedSeats: [OrderedSeat]!
    }

    type CreateTicketPayload {
        httpCode: String
        message: String
        userAccount: Int
        refCode : [String]
    }

    input GetInfoFromRefInput {
        reference_code: String
    }

    type GetInfoFromRefPayload {
        movie_name: String
        datetime_start: String
        datetime_end: String
        theater_name: String
        ticket_status: String
        row: String
        column: String
    }

`

const quries =`#graphql
    getBookedSeats (input: GetBookedSeatsInput) : GetBookedSeatsPayload
    getInfoFromRef (input: GetInfoFromRefInput) : GetInfoFromRefPayload
`

const mutations = `#graphql
    createTicket (input: CreateTicketInput) : CreateTicketPayload
`

const resolvers = {
    Query: {
        getBookedSeats : (_, args) => ticketController.getBookedSeats(args.input),
        getInfoFromRef : (_, args) => ticketController.getInfoFromRef(args.input)
    },
    Mutation: {
        createTicket: (_, args) => ticketController.createMultipleTickets(args.input)
    }
}

module.exports = {
    typeDefs,
    quries,
    mutations,
    resolvers
}