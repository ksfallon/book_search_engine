import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                # savedBooks[Books]
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
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation savedBook($_id: Int!, $authors: String, $description: String!, $bookId: String!, $title: String!, $link: String, $image: String) {
        savedBook(_id: $_id, authors: $authors, description: $description, bookId: $bookId, title: $title, link: $link, image: $image,) {
            _id
            savedBooks {
                authors
                description
                bookId
                title
                link
                image
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook(bookId: String) {}!) {
        removeBook(bookId: $bookId) {
            _id
            savedBooks() {
                authors
                description
                bookId
                title
                link
                image
                }
            }
        }
    }
`;

// export const REMOVE_BOOK = gql`
//     mutation removeBook($_id: Int!, bookId: Int!) {
//         removeBook(_id: $_id, bookId: $bookId) {
//             user{
//                 _id
//                 savedBooks {
//                     bookId
//                 }
//             }
//         }
//     }
// `;




