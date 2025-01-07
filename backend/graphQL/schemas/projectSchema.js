const { gql } = require("apollo-server");

const projectDefs = gql`
    type Project{
        _id: ID
        owner: String
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
        getProject(id: ID!) : Project
        getAllProjects: [Project]
    }

    type Mutation{
        createProject(input: CreateProjectInput) : Project
        editProject(input: EditProjectInput) : Project
        deleteProject(input: ID!) : Project
    }

    input CreateProjectInput{
        owner: String
        name: String
        description: String 
        techStack: [String]
        datePosted: String 
        githubLink: String
        liveSiteLink: String
    }

    input EditProjectInput{
        _id: ID
        name: String
        description: String 
        techStack: [String]
        githubLink: String
        liveSiteLink: String
    }
`

module.exports = projectDefs;