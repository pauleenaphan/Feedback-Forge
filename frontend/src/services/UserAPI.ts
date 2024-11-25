import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser($input: CreateUserInput) {
        createUser(input: $input) {
            username
            email
            password
        }
    }
`;

export const LOGIN = gql`
    mutation login($input: LoginInput){
        login(input: $input){
            email
            password
        }
    }
`