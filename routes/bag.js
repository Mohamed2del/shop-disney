var express = require('express');
const { render } = require('../app');
var router = express.Router();
// post
const FormData = require('form-data');
const fetch = require('node-fetch');
const info = require('../handlers/productinfo');
router.get('/:id', function (req, res) {
  var end = postFunction(req.params.id, res.csrf_token)
    .then((response) => response.json())
    .then((response) => console.log(response))

    .catch((err) => {
      console.log(err);
    });

  res.send(res.body);
});

function postFunction(id, csrf_token) {
  const form = new FormData();
  form.append('format', 'ajax');
  form.append('Quantity', '1');
  form.append('pid', id);
  form.append('csrf_token', csrf_token);
  return fetch(
    'https://www.shopdisney.co.uk/on/demandware.store/Sites-disneyuk-Site/en_GB/Cart-AddProduct',
    {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

module.exports = router;
