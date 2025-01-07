const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();
const mongoose = require("mongoose");

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const userSchema = require("../backend/graphQL/schemas/userSchema");
const projectSchema = require("../backend/graphQL/schemas/projectSchema");
const commentSchema = require("../backend/graphQL/schemas/commentSchema");

const userResolver = require("../backend/graphQL/resolvers/userResolver");
const projectResolver = require("../backend/graphQL/resolvers/projectResolver");
const commentResolver = require("../backend/graphQL/resolvers/commentResolver");

const corsOptions = {
    origin: '*', // Allow all origins, adjust in production
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const apolloServer = new ApolloServer({
    typeDefs: [userSchema, projectSchema, commentSchema],
    resolvers: [userResolver, projectResolver, commentResolver],
    introspection: true,
    playground: true,
});

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const getContext = ({ req }) => {
    // List of queries and mutations that don't require authentication
    const publicQueries = [
        'getUser',
        'getAllProjects',
        'getProject',
        'createUser',
        'login'
    ];

    // Skip token check for introspection queries (like __schema)
    if (req.body.query.includes('__schema')) {
        return {};  // No token required for introspection queries
    }

    // Check if the current query is in the list of public queries
    const isPublicQuery = publicQueries.some(query => req.body.query.includes(query));

    if (isPublicQuery) {
        return {};  // No token required for this query
    }

    // Otherwise, check for token and throw error if not found
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new Error('No token provided');
    return { token };
};


async function startServer() {
    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port: 3001 },
        context: getContext,
        cors: corsOptions,
    });

    console.log(`Server ready at ${url}`);
}

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log('MongoDB connected');
        startServer();
    })
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
