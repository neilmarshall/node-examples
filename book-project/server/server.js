const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());

// DB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost:27017/book_db',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const {Book} = require(`${__dirname}/models/books`);
const {Store} = require(`${__dirname}/models/stores`);

//GET
app.get('/api/stores', (req, res) => {
    Store.find()
         .then(doc => res.status(200).send(doc))
         .catch(err => res.status(400).send(err));
});

app.get('/api/books', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;

    Book.find()
        .sort({name: 'asc'})
        .limit(limit)
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(err));
});

// POST
app.post('/api/add/books', (req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages,
        price: req.body.price,
        stores: req.body.stores,
    });

    book.save()
        .then(doc => res.status(201).send(doc))
        .catch(err => res.status(400).send(err));
});

app.post('/api/add/store', (req, res) => {
    const store = new Store({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    });

    store.save()
         .then(doc => res.status(201).send(doc))
         .catch(err => res.status(400).send(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`started listening on post ${port}`);
});
