const { gql } = require("apollo-server");

const userDefs = gql`
    type User{
        username: String
        email: String
        password: String
        projects: [Project]
    }

    type AuthPayload {
        token: String
        user: User
    }

    type Project { 
        _id: ID
        name: String
        description: String
        techStack: [String]
        datePosted: String
        githubLink: String
        liveSiteLink: String
        comments: [Comment]
    }

    type Comment{
        user: String
        description: String
        datePosted: String
    }

    type Query{
        getUser(input: ID) : User
    }

    type Mutation{
        createUser(input: CreateUserInput) : User
        login(input: LoginInput): AuthPayload
    }

    input CreateUserInput{
        username: String!
        email: String!
        password: String!
    }

    input LoginInput{
        email: String!
        password: String!
    }
`

module.exports = userDefs;