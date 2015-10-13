var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', message: 'Express4.0' });
});

router.get('/photo', function(req, res, next) {
  res.render('photo', { name: 'Express', info: 'Express4.0' });
});


module.exports = router;