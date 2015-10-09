module.exports = {
    name: 'Guardian',
    description: 'Quick and easy solution for user management',
    development: {
        port: 3434,
        database: 'mongodb://localhost/guardian'
    },
    production: {
        port: 80,
        database: 'mongodb://localhost/guardian'
    },
    secret: '1WvC6dot2o/sba`4zg}JlEr]!q#Aoz7R5+i^4TjVKL8UM<c96S^}4Q|Fx72Z3"N'
};