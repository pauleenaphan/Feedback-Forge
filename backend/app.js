var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();

const mongoose = require("mongoose");

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const userSchema  = require("../backend/graphQL/schemas/userSchema");
const projectSchema  = require("../backend/graphQL/schemas/projectSchema");

const userResolver = require("../backend/graphQL/resolvers/userResolver");
const projectResolver = require("../backend/graphQL/resolvers/projectResolver");

const apolloServer = new ApolloServer({
    typeDefs: [userSchema, projectSchema],
    resolvers: [userResolver, projectResolver],
    introspection: true,
    playground: true, 
});

const cors = {
    origin: '*', // Allow all origins; specify yours for production
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    context: ({ req }) => {
        // Allow introspection without a token during development or if introspection is enabled
        if (req.body.query.includes('__schema')) {
            return {};  // No token required for introspection queries
        }

        // Check for token in other cases
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) throw new Error('No token provided');
        return { token };
    },
};

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Server will start on 3001 port 
async function startServer() {
    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: 3001 },
        context: ({ req }) => {
            // console.log("Authorization Header:", req.headers.authorization);
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (!token) throw new Error('No token provided');
            return { token };
        },
        cors,
    });

    console.log(`Server ready at ${url}`);
}

mongoose.connect(process.env.MONGO_DB_URL)
    // Connect to db then start the server
    .then(() => {
    console.log('MongoDB connected') 
    startServer();
}).catch(err => console.error('MongoDB connection error:', err));



module.exports = app;
