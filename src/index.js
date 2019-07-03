const { GraphQLServer } = require('graphql-yoga');

const { Task } = require('./model/Model'); 
const Query = require('./query/Query');
const Mutation = require('./mutation/Mutation');

let tasks = [{
    id: 'task-0',
    title: 'String!',
    description: 'String!',
    checked: 'Boolean!',
    category: 'cat-0'
}];

const resolvers = {
    Query,
    Mutation,
    Task
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));