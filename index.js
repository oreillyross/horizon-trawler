const express = require('express')
const app = express()
const logger = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 80

require('dotenv').config()


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));



app.listen(port, () => console.log(`Example app listening on port ${port}!`))





