var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

var node_env = process.env.NODE_ENV;
if(node_env === undefined) {
  require('dotenv').config();
}
// var auth0 = require('./auth0.js')

var yelpRouter = require('./routes/yelpRouter');
var deckRouter = require('./routes/deckRouter');
var userRouter = require('./routes/userRouter');
// var jwtCheck = jwt({
//   secret: new Buffer(process.env.AUTH0_CLIENT_SECRET), // new Buffer(auth0.clientSecret),
//   audience: process.env.AUTH0_CLIENT_ID// auth0.clientID
// })

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use('/', jwtCheck);
app.use('/yelpSearch', yelpRouter);
app.use('/decks', deckRouter);
app.use('/users', userRouter);

module.exports = http;
