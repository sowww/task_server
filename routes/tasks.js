var express = require('express');
var router = express.Router();

var tasks = [{
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
}];

/* GET users listing. */
router.get('/', function(req, res) {
  console.log(req.method);
  res.json(tasks);
});

router.put('/', (req, res) => {
  let body = req.body;
  tasks.push(body);
  console.log(`Id: ${body.id} Text: ${body.text}`);
  res.json({});
});

router.delete('/', (req, res) => {
  let body = req.body;
  if (body.deleteAll) { 
    tasks= []; 
  } else {
    tasks.pop();
  }
  console.log(`Delete all`);
  res.json({});
});

module.exports = router;
