'use strict';

const express = require('express');
const app = express();
const bearerToken = require('express-bearer-token');

const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./controllers/router');

app.use(bearerToken());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'Noode.JS-Coding-Challenge',
    resave: 'true',
    saveUninitialized: true
}))

router.set(app);

app.use(express.static('client'));

app.listen(config.port, () => console.log(`Server runnig on http://localhost:${config.port}`));

module.exports = app;