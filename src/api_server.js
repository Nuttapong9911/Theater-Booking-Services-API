require('dotenv').config();
const { ApolloServer } = require('apollo-server-express')
const API_PORT  = process.env.API_PORT

const { typeDefs, resolvers } = require('./api/schemas/rootSchema')

const express = require('express')

async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({typeDefs, resolvers})
    const app = express();
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    
    app.listen(API_PORT, () => {
    console.log(`API SERVER is listening on port ${API_PORT}${server.graphqlPath}`);
})
}

startApolloServer(typeDefs, resolvers);