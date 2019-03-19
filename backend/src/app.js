// import dependencies
const express = require('express');
const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mongoose = require('mongoose');

// import required files
const router = require('./router');

// set the port of the server
const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

// set the URI for connecting to database
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/project2';

// connect to the database
mongoose.connect(DB_URI, (err) => {
  if (err) throw err;
});

// create express app and connect middleware
const app = express();
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// route server requests through helper js file
router(app);

// start sever
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on 127.0.0.1:${PORT}.`);
});
