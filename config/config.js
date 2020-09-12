const fs = require('fs');

module.exports = {
    development: {
        "username": process.env.PG_USER,
        "password": process.env.PG_PW,
        "database": "creatiview-development",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    test: {
        "username": process.env.PG_USER,
        "password": process.env.PG_PW,
        "database": "creatiview_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    production: {
        "username": process.env.PG_USER,
        "password": process.env.PG_PW,
        "database": "d6q76moa48qp8h",
        "host": "ec2-46-137-177-160.eu-west-1.compute.amazonaws.com",
        "dialect": "postgres"
    }
}