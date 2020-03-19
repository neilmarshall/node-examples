const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine','hbs');

const urlencode = bodyParser.urlencoded({extended: false});

app.get("/", (req, res) => {
    console.log(`GET "/" ${new Date()}`);
    res.render('home', {
        firstName: "Francis",
        lastName: "Jones",
        otherNames: ["Alan", "Basil", "Cleveland", "Derek", "Ernie"]
    });
});

app.get("/form", (req, res) => {
    console.log(`GET "/form" ${new Date()}`);
    res.render('form');
});

app.post("/form", urlencode, (req, res) => {
    console.log(`POST "/form" ${new Date()}`);
    res.render('home', {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
});

const port = process.env.PORT || 3000;
app.listen(port);
