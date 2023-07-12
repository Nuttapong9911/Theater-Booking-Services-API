const movieController = require('../controllers/movieController')

const typeDefs = `#graphql
    type Movie {
        _movieID: String!
        movie_name: String!
        description: String
        movie_duration: Int
        genres: [String]!
        movie_image: String
    }

    type AllMoviePayload {
        data: [Movie]
    }

    input CreateMovieInput {
        movie_name: String
        description: String
        movie_duration: Int
        genre: [String]
        movie_status: String
        movie_image: String
    }

    type CreateMoviePayload{
        httpCode: String
        message: String
    }

    input EditMovieInput {
        _movieID: String
        movie_name: String
        description: String
        movie_duration: Int
        genre: [String]
        movie_status: String
        movie_image: String
    }

    input GetMovieByIDInput {
        _movieID: String
    }

`

const quries =`#graphql
    getAllMovie : AllMoviePayload
    getMovieByID (input: String) : Movie
`

const mutations = `#graphql
    createMovie (input: CreateMovieInput) : CreateMoviePayload
    editMovieByID (input: EditMovieInput) : CreateMoviePayload
`

const resolvers = {
    Query: {
        getAllMovie: (_, args) => movieController.getAllMovie(),
        getMovieByID: (_, args) => movieController.getMovieByID(args.input)
    },
    Mutation: {
        createMovie : (_, args) => movieController.createMovie(args.input),
        editMovieByID: (_, args) => movieController.editMovieByID(args.input)
    }
}

module.exports = {
    typeDefs,
    quries,
    mutations,
    resolvers
}