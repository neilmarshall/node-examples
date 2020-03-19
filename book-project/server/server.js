const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(`${__dirname}/../public`));

// DB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/book_db');

const {Book} = require('./models/books');
const {Store} = require('./models/stores');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`started listening on post ${port}`);
});
