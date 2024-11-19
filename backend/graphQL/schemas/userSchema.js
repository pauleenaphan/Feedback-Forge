const { gql } = require("apollo-server");

const userDefs = gql`
    type User{
        username: String
        email: String
        password: String
    }

    type Query{
        getUser(input: ID) : User
    }

    type Mutation{
        createUser(input: CreateUserInput) : User
    }

    input CreateUserInput{
        username: String!
        email: String!
        password: String!
    }
`

module.exports = userDefs;