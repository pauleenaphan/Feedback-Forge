import { gql } from "@apollo/client";

// Mutation for creating a project
export const CREATE_PROJECT = gql`
    mutation createProject($input: CreateProjectInput) {
        createProject(input: $input) {
            _id
            owner
            name
            shortDescription
            longDescription
            techStack
            datePosted
            githubLink
            liveSiteLink
        }
    }
`;

// Mutation for editing a project
export const EDIT_PROJECT = gql`
    mutation editProject($input: EditProjectInput) {
        editProject(input: $input) {
            _id
            name
            shortDescription
            longDescription
            techStack
            githubLink
            liveSiteLink
        }
    }
`;

// Mutation for deleting a project
export const DELETE_PROJECT = gql`
    mutation deleteProject($input: ID!) {
        deleteProject(input: $input) {
            _id
        }
    }
`;

// Mutation for adding a comment to a project
export const ADD_COMMENT = gql`
    mutation addComment($input: AddCommentInput) {
        addComment(input: $input) {
            user
            description
            datePosted
            projectId
        }
    }
`;

// Query for getting a single project
export const GET_PROJECT = gql`
    query getProject($id: ID!) {
        getProject(id: $id) {
            _id
            owner{
                _id
                username
            }
            name
            shortDescription
            longDescription
            techStack
            datePosted
            githubLink
            liveSiteLink
            comments {
                user
                description
                datePosted
            }
        }
    }
`;

// Query for getting all projects
export const GET_ALL_PROJECTS = gql`
    query getAllProjects {
        getAllProjects {
            _id
            owner{
                _id
                username
            }
            name
            shortDescription
            techStack
            datePosted
            githubLink
            liveSiteLink
            comments {
                user
                description
                datePosted
            }
        }
    }
`;
