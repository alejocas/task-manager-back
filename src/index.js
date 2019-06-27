const { GraphQLServer } = require('graphql-yoga');

let tasks = [{
    id: 'task-0',
    title: 'String!',
    description: 'String!',
    checked: 'Boolean!',
    category: 'cat-0'
}]

let categories = [{
    id: 'cat-0',
    name: 'Default'
}]

let idCount = tasks.length

const resolvers = {
    Query: {
        allTasks: () => tasks,
        allCategories: (parent, args) => []
    },
    Task: {
        id: (parent) => parent.id,
        title: (parent) => parent.title,
        description: (parent) => parent.description,
        category: (parent) => parent.category ? parent.category : ''
    },
    Mutation: {
        createTask: (parent, args) => {
            args.description = args.description ? args.description : '';
            args.categoryId = args.categoryId ? args.categoryId : 'cat-0';
            const task = {
                id: `task-${idCount++}`,
                title: args.title,
                description: args.description,
                categoryId: args.categoryId
            };
            tasks.push(task);
            return task;
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));