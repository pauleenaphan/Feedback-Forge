var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();

const mongoose = require("mongoose");

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const apolloServer = new ApolloServer({
    typeDefs: [],
    resolvers: []
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Server will start on 3001 port 
async function startServer(){
    const { url } = await startStandaloneServer(apolloServer, {
      listen: { port: 3001 }, // You can specify the port here as needed
    });
}

mongoose.connect(process.env.DEV_DB_URL)
    // Connect to db then start the server
    .then(() => {
    console.log('MongoDB connected') 
    startServer();
}).catch(err => console.error('MongoDB connection error:', err));


mongoose.connect(process.env.MONGO_DB_URL)

module.exports = app;
