const { gql } = require('apollo-server-express')
const { merge } = require('lodash')
const movie = require('./movie')
const showtime = require('./showtime')
const user = require('./user')
const theater = require('./theater')
const ticket = require('./ticket')

const moduleTypeDefs = [
    movie.typeDefs,
    showtime.typeDefs,
    user.typeDefs,
    theater.typeDefs,
    ticket.typeDefs
]

const moduleQueries = [
    movie.quries,
    showtime.quries,
    theater.quries,
    ticket.quries,
    user.quries
]

const moduleMutations = [
    movie.mutations,
    user.mutations,
    ticket.mutations,
    showtime.mutations,
    theater.mutations
]

const typeDefs = gql`
    ${moduleTypeDefs.join('\n')}

    type Query {
        ${moduleQueries.join('\n')}
    }

    type Mutation {
        ${moduleMutations.join('\n')}
    }

    schema {
        query: Query
        mutation: Mutation
    }
`

const resolvers = merge(
    movie.resolvers,
    showtime.resolvers,
    user.resolvers,
    theater.resolvers,
    ticket.resolvers
)

module.exports = {
    typeDefs,
    resolvers
}