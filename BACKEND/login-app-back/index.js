const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const User = require("./Model/user-model");
const { GraphQLError } = require("graphql");

mongoose.connect(process.env.MONGO)
    .then(() => console.log("Database connected."));

const resolvers = {
    Query: {
        allUsers: async () => User.find({}),
        userCount: async () => {
            const result = (await User.find({})).length;
            return result;
        }
    },
    Mutation: {
        login: async (_, args) => {
            const logUser = await User.findOne({ email: args.email });

            if(!logUser){
                throw new GraphQLError("User not found", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    }
                })
            }
            return logUser;
        },
        register: async (_, args) => {
            const registerUser = await new User({
              username: args.username,
              email: args.email,
              password: args.password  
            })

            try {
                await registerUser.save()
            } catch (err) {
                throw new GraphQLError("Could not register new user", {
                    extensions: {
                        code: "BAD_USER_INPUT"
                    }
                })
            }
            return registerUser;
        }
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "graphql/schema.graphql"), "utf-8"),
    resolvers
})

startStandaloneServer(server, {
    listen: {
        port: process.env.PORT
    }
})
.then((res) => console.log(`Server running on port ${res.url}`))