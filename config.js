module.exports = {
    name: 'Nookie',
    description: 'Quick and easy solution for user management',
    development: {
        port: 3434,
        database: 'mongodb://localhost/taskManager'
    },
    production: {
        port: 80,
        database: 'mongodb://localhost/taskManager'
    }
};