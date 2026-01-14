const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();

//create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sun@135!!',
    database: 'nodesql'
});

//to insert data thorgh code
let q = 'insert into users (userId, username, email, password) values ?';
let users = [
    ['1', 'john_doe', 'john@example.com', 'password123'],
    ['2', 'jane_smith', 'jane@example.com', 'password456']
];

let createRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};
//inserting data in bulk using faker
// let data = [];
// for (let i = 0; i < 100; i++) {
//     data.push(createRandomUser());
// };
// connection.end();


app.get('/', (req, res) => {
    let q = `select count(*) from users`;
    try {
        connection.query(q, (err, results, fields) => {
            if (err) throw err;
            console.log('Tables in the database:', results);
            res.send(results);
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});