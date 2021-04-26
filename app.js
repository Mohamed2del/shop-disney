var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');
var bagRouter = require('./routes/bag');

var crawlProduct = require('./handlers/scraping.js');
const cheerio = require('cheerio');

var app = express();
const port = 5050;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/product/:id', function (req, res, next) {
  crawlProduct(req.params.id)
    .then((response) => {
      const $ = cheerio.load(response.body);
      res.body = {
        product_name: $('.product__name').text(),
        csrf_token: $('.csrftoken').val(),
        link: `https://www.shopdisney.co.uk/${req.params.id}.html?cgid=2000071`,
      };
      res.csrf_token = $('.csrftoken').val();

      console.log(cheerio.load(response));
      next();
    })
    .catch((err) => {
      console.log('Not found');
      res.body = {
        error: '404 Not Found',
      };
      next();
    });
});
app.use('/bag/:id', function (req, res, next) {
  console.log(req.params.id);
  crawlProduct(req.params.id)
    .then((response) => {
      const $ = cheerio.load(response.body);
      res.body = {
        product_name: $('.product__name').text(),
        csrf_token: $('.csrftoken').val(),
        link: `https://www.shopdisney.co.uk/${req.params.id}.html?cgid=2000071`,
      };
      var csrf_token = (csrf_token = $('.csrftoken').val());
      res.csrf_token = csrf_token;
      console.log(csrf_token);

      next();
    })
    .catch((err) => {
      console.log('Not found');
      res.body = {
        error: '404 Not Found',
      };
      next();
    });
});
app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/bag', bagRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
