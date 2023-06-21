const userController = require('../controllers/userController')

const typeDefs = `#graphql

    input RegisterInput {
        firstname: String!
        lastname: String!
        username: String!
        password: String!
    }

    type RegisterPayload {
        httpCode: String
        message: String
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type LoginPayload {
        httpCode: String
        message: String
        token: String
    }

    type DecodeTokenPayload {
        user_id: String
        firstname: String
        lastname: String
    }
`

const quries =`#graphql
    decodeToken (token: String) : DecodeTokenPayload
`

const mutations = `#graphql
    register (input: RegisterInput!) : RegisterPayload
    login (input: LoginInput!) : LoginPayload
`

const resolvers = {
    Query: {
        decodeToken: (_, args) => userController.decodedToken(args.token)
    },
    Mutation: {
        register: (_, args) => userController.register(args.input),
        login: (_, args) => userController.login(args.input)
    }
}

module.exports = {
    typeDefs,
    quries,
    mutations,
    resolvers
}