

var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/data/Sale-Data.csv');
});

module.exports = router;