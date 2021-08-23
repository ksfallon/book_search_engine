const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedbooks: [Book]
}

type Book {
    _id: ID!
    bookId: String!
    authors: []
    description: String!
    title: String!
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    # users: [User]
    user(username: String!):User
    # OR SHOULD IT BE
    me(username: String!):User
    # books(username: String!): [Book]
    # book(bookId: ID!): Book
    # authors(bookId: String!): [Author]
    # author(authorId: String!): Author
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: String!, description: String!, bookId: String!, title: String!, link: String!, $image: String!): Book
    removeBook(bookId: ID!): Book
}
`
module.exports = typeDefs;