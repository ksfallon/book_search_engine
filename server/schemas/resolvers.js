const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models'); // Book isn't in index.js for some reason
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {

            if (context.user) { 
                const userData = await User.findOne({_id: context.user._id}).select('-__v -password'); // __v is the version key
                
                return userData;
            }
        },
    },
    Mutation: {
    //ADDING a new USER - need to create
        addUser: async ({parent, args}) => {
            const user = await User.create(args);
            const token = signToken(user);

            return {token, user};
        },

    //LOGINNING IN A USER, AND MAKING SURE USERNAME IS A SAVED USERNAME AND THEN THAT THE PASSWORD IS THE CORRECT ONE.    
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email})
            
            if (!user) {
                throw new AuthenticationError('YOU DONT KNOW YOUR OWN EMAIL?!?');
            }

            const correctPw = await User.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Not your password silly! Try again!');
            }

            const token = signToken(user);

            return {token, user};
        },

    // ADDING A BOOK TO A USER'S SAVED BOOKS
        saveBook: async (parent, {data}, context) => { //data = args here, it is all of the parameters for books - title, author, description, etc...

            if (context.user) {
                const dataAdd = await User.findByIdAndUpdate(
                    {_id: context.user._id}, 
                    {$push: {savedBooks: data}},
                    { new: true},
                    );
                return dataAdd;
            }

            throw new AuthenticationError('GOTTA LOG IN TO SAVE!')
        },
    
    // REMOVING A BOOK FROM A USER'S SAVED BOOKS
        removeBook: async (parent, {data}, context) => {

        if (context.user) {
            const dataDelete = await User.findById(
                {_id: context.user._id}, 
                {$pull: {savedBooks: data}},
                { new: true},
                );
            return dataDelete;
        }

        throw new AuthenticationError('GOTTA LOG IN TO DELETE!')
        },

    }
}

module.exports = resolvers;