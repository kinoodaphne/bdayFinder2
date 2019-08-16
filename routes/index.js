var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chat' });
});

/* GET login page */
router.get('/users/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET signup page */
router.get('/users/signup', function(req, res, next) {
  res.render('signup', { title: 'Login' });
});

module.exports = router;
