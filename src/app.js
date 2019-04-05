// import dependencies
const express = require('express');
const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
// const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// const csrf = require('csurf');

// import required files
const router = require('./router');

// set the port of the server
const PORT = process.env.PORT || process.env.NODE_PORT || 8080;

// set the URI for connecting to database
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/project2';

// connect to the database
mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
  if (err) throw err;
});

// connect to redis
let redisURL = {
  hostname: 'localhost',
  port: 6379,
};

let redisPASS;

if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPASS = redisURL.auth.split(':')[1];
}

// create express app and connect middleware
const app = express();
app.disable('x-powered-by');
app.use('/', express.static(path.resolve(`${__dirname}/../client/dist`)));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS,
  }),
  secret: 'Domo Arigato',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));
app.use(cookieParser());
// app.use(csrf());
// app.use((err, req, res, next) => {
//   if (err.code !== 'EBADCSRFTOKEN') return next(err);

//   console.log('Missing CSRF Token');
//   return false;
// });


app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});
// route server requests through helper js file
router(app);
app.use('/api', router);

// start sever
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on 127.0.0.1:${PORT}.`);
});
