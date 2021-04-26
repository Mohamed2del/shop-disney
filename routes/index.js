var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', function (req, res, next) {
  fetch(
    'https://www.shopdisney.co.uk/disney-store-the-mandalorian-talking-action-figure-star-wars-461011590698.html?cgid=2000087',
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    }
  )
    .then((respond) => {
      console.log(respond.headers);
      res.send(respond.headers);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
