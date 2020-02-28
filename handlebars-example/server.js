const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine','hbs');

app.get("/", (req, res) => {
    res.render('home', {
        firstname:"Francis",
        lastname:"Jones"
    });
});

const port = process.env.PORT || 3000;
app.listen(port);
