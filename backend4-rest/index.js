const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {
        id: uuidv4(),
        username: 'sundas',
        content: 'Hello World! This is my first post.'
    },
    {
        id: uuidv4(),
        username: 'rehan',
        content: 'i got selected for internship!'
    },
    {
        id: uuidv4(),
        username: 'ali',
        content: 'i had a good day!'
    }
];

app.get('/', (req, res) => {
    res.redirect('/posts');
});

app.get('/posts', (req, res) => {
    res.render('index.ejs', { posts: posts });
})

app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let newid = uuidv4();
    posts.push({ id: newid, username, content });
    res.redirect('/posts');
});

app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('show.ejs', { post });
});

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let { newcontent } = req.body;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    res.redirect('/posts');
});

app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render('edit.ejs', { post });
});

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect('/posts');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});