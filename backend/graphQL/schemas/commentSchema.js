const { gql } = require("apollo-server");

const commentDefs = gql`
    type Comment{
        project: Project
        user: String 
        description: String
        datePosted: String
    }

    type Mutation{
        addComment(input: AddCommentInput) : Comment
    }

    input AddCommentInput{
        projectId: ID
        user: String 
        description: String
        datePosted: String
    }
`

module.exports = commentDefs;