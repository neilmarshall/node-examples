const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(`${__dirname}/../public`));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`started listening on post ${port}`);
});
