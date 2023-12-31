import { gql } from '@apollo/client';

export const ALL_USER = gql`
    query {
        allUsers {
            username
            email
        }
    }
`

export const LOGIN_USER = gql`
    mutation login($email: String! $password: String!) {
        login(email: $email password: $password) {
            username
            email
        }
    }
`

export const REGISTER_USER = gql`
    mutation register($username: String! $email: String! $password: String!) {
        register(username: $username email: $email password: $password) {
            username
            email
        }
    }
`