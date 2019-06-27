const { GraphQLServer } = require('graphql-yoga');

let tasks = [{
    id: 'task-0',
    title: 'String!',
    description: 'String!',
    checked: 'Boolean!',
    category: 'cat-0'
}]

let idCount = tasks.length

const resolvers = {
    Query: {
        allTasks: () => tasks
    },
    Task: {
        id: (parent) => parent.id,
        title: (parent) => parent.title,
        description: (parent) => parent.description,
        checked: (parent) => parent.checked
    },
    Mutation: {
        createTask: (parent, args) => {
            args.description = args.description ? args.description : '';
            const task = {
                id: `task-${idCount++}`,
                title: args.title,
                description: args.description,
                checked: false
            };
            tasks.push(task);
            return task;
        },
        checkTask: (parent, args) => {
            tasks = tasks.map(elem => args.id === elem.id ? elem.checked = args.checked : "Do nothing");
            return tasks.filter(elem => args.id === elem.id)[0];
        },
        deleteTask: (parent, args) => {
            let exists = false;
            tasks.forEach(elem => {
                args.id === elem.id ? exists = true : "Do nothing";
            });
            tasks = tasks.filter(elem => elem.id !== args.id);
            return exists
        },
        updateTask: (parents, args) => {
            tasks = tasks.map(elem => {
                if(args.id === elem.id) {
                    elem.title = args.title ? args.title : elem.title;
                    elem.description = args.description ? args.description : elem.description;
                }
            });
            return tasks.filter(elem => elem.id === args.id)[0];
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));