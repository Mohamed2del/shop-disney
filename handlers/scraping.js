const fs = require('fs');
const cheerio = require('cheerio');
const got = require('got');

var crawlProduct = function (id) {
  const vgmUrl = `https://www.shopdisney.co.uk/${id}.html?cgid=2000071`;

  return got(vgmUrl);
};
module.exports = crawlProduct;
