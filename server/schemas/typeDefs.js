const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    books: [Book]
}

type Book {
    _id: ID!
    authors: [Author]!
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

# DO I NEED THIS TYPE HERE?!
type Author {
    _id: ID!
    name: String!
}

type Query {
    users: [User]
    user(username: String!):User
    books(username: String!): [Book]
    book(bookId: ID!): Book
    authors(bookId: String!): [Author]
    author(authorId: String!): Author
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(authors: String!, description: String!, bookId: String!, title: String!,): Book # should i also include the none required items here too?
    # DO I NEED AN addAuthor?
    removeBook(bookId: ID!): Book
    # DO I NEED A removeAuthor?
}
`
module.exports = typeDefs;