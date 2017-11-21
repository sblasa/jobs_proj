var express = require('express');
var router = express.Router();

/* GET Jobresults page. */
router.get('/', function(req, res, next) {
  res.render('jobresults', { title: 'Job Results' });
});

module.exports = router;
