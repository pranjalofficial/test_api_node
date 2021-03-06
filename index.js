'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const itemRouter = require('./routes/item-routes')

const app = express();

//test_api
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', itemRouter.routes);

app.listen(config.port, () => console.log('App listening on port ' + config.port))