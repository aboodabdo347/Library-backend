const express = require("express")
const app = express();
const logger = require('morgan');
require('dotenv').config();
require('./config/database');

//routers go here

app.listen(3000, () => {
    console.log("listening on port 3000")
})