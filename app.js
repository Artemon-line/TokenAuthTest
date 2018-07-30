'use strict';

const express = require('express');
const app = express();
const bearerToken = require('express-bearer-token');

const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./controllers/router');

app.use(bearerToken());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.set(app);

app.listen(config.port, () => console.log(`Server runnig on http://localhost:${config.port}`));

app.init = function() { console.log('test') };

module.exports = app;