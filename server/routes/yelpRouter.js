const express = require('express');
const router = express.Router();
const Yelp = require('yelp');
// const keys = require('../apiKeys');

router.get('/', (req, res) => {
  const yelp = new Yelp({
    consumer_key: process.env.CONSUMER_KEY, // keys.consumerKey,
    consumer_secret: process.env.CONSUMER_SECRET, // keys.consumerSecret,
    token: process.env.TOKEN, // keys.token,
    token_secret: process.env.TOKEN_SECRET, // keys.tokenSecret,
  });
  
  const term = req.query.term;
  const location = req.query.location;

  yelp.search({ term, location })
    .then(function (data) {
      console.log(data);
      res.send(data);
    })
    .catch(function (err) {
      console.error(err);
    });
})

module.exports = router;