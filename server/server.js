const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express'); // Need to require the apollo-server-express package to use graphQL
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas'); //need to require our schemas here for routing purposes
// const routes = require('./routes'); No longer need to require routes because we are not doing a restful api anymore

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({ // need to set the ApolloServer to equal the typeDefs and resolvers
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app }); // Now need our Server.Schemas to call on the middleware here super important for our authorization

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/budget", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// }
// );

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//app.use(routes); NO LONGER USING ROUTES FOR APIs -INSTEAD:
app.get('*', (req, res) => { // here is our GET to grab our index.html
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => { // once is an event listener on the database which is our user controller - creating all the users
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`) // need this so we can use graphql!!
  })
});
