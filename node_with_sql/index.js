const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
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

//get users count and render on home page --> crud operation - read
app.get('/', (req, res) => {
    let q = `select count(*) from users`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            let usersCount = results[0]['count(*)'];
            res.render('home.ejs', { usersCount: usersCount });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

//sohw all users
app.get('/users', (req, res) => {
    let q = `select * from users`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            let users = results;
            res.render('users.ejs', { users: results });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})

//edit user
app.get('/user/:id/edit', (req, res) => {
    let { id } = req.params;
    let q = `select * from users where userId = '${id}'`;
    try {
        connection.query(q, (err, results) => {
            if (err) throw err;
            res.render('edit.ejs', { users: results[0] });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})


//update user
app.patch('/user/:id', (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    const q1 = `SELECT * FROM users WHERE userId = '${id}'`;
    connection.query(q1, (err, results) => {
        if (err) return res.status(500).send('DB error');
        const user = results[0];
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (password !== user.password) {
            return res.redirect(`/user/${id}/edit`);
        }
        const q2 = `UPDATE users SET username='${username}' WHERE userId='${id}'`;
        connection.query(q2, (err) => {
            if (err) return res.status(500).send('Update failed');
            return res.redirect('/users');
        });
    });
});

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;

    const q = `DELETE FROM users WHERE userId='${id}'`;

    connection.query(q, (err) => {
        if (err) return res.status(500).send('Delete failed');
        res.redirect('/users');
    });
});










app.listen(3000, () => {
    console.log('Server is running on port 3000');
});