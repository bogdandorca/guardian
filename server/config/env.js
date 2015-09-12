module.exports = {
    development: {
        port: 3434,
        database: 'mongodb://localhost/taskManager'
    },
    production: {
        port: 80,
        database: 'mongodb://localhost/taskManager'
    }
};