const express = require('express');
const cors = require('cors');
const app = express();

const backdoor = require('./api/routes/backdoor');


app.use('/api', backdoor);
app.use(cors());

module.exports = app;