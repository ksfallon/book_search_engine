import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                savedBooks[]
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email  #don't know if i need email to be returned
                password  #don't know if i need password to be returned
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation savedBook($_id: Int!, $author: String, $description: String!, $bookId: String!, $title: String!, $link: String, $image: String) {
        savedBook(_id: $_id, authors: $authors, description: $description, bookId: $bookId, title: $title, link: $link, image: $image,)
        user{
            _id
            savedBooks {
                authors []
                description
                bookId
                title
                link
                image
            }
        }
    }
`;



