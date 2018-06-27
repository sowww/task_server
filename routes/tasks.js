var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
    id: 1,
    text: "Task 1"
  }, {
    id: 2,
    text: "Task 2",
  }, {
    id: 3,
    text: "Task 3",
  }, {
    id: 4,
    text: "Task 4",
  }])
});

module.exports = router;
