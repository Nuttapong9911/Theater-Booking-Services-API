const theaterController = require('../controllers/theaterController')

const typeDefs = `#graphql
    type Seat {
        seat_type: String
        price: Int
        rows: [String]
        column: [String]
    }

    type Theater {
        _id: ID!
        theater_name: String
        seats: [Seat]
    }

    input GetTheaterInput {
        _theaterID: String!
    }

    input GetTheaterByNameInput {
        theater_name: String!
    }

    type GetTheaterPayload {
        data : Theater
    }

    input CreateTheaterInput {
        theater_name: String
        description: String
    }

    type CreateTheaterPayload {
        httpCode: String
        message: String
    }

    input EditTheaterInput {
        _theaterID: String
        theater_name: String
        description: String
    }

    type EditTheaterPayload {
        httpCode: String
        message: String
    }

`

const quries =`#graphql
    getTheaterByID (input: GetTheaterInput) : GetTheaterPayload
    getTheaterByName (input: GetTheaterByNameInput) : GetTheaterPayload
`

const mutations = `#graphql
    createTheater (input: CreateTheaterInput) : CreateTheaterPayload
    editTheaterByID (input: EditTheaterInput) : EditTheaterPayload
`

const resolvers = {
    Query: {
        getTheaterByID: (_, args) => theaterController.getTheater(args.input),
        getTheaterByName: (_, args) => theaterController.getTheaterByName(args.input),
    },
    Mutation: {
        createTheater: (_, args) => theaterController.createTheater(args.input),
        editTheaterByID: (_, args) => theaterController.editTheaterByID(args.input)
    }
}

module.exports = {
    typeDefs,
    quries,
    mutations,
    resolvers
}