var express = require('express');
var router = express.Router();

// variable to store our task list
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

// Sends tasks json on get request
router.get('/', function(req, res) {
  console.log(req.method);
  res.json(tasks);
});

// On put request: get request info and a new task from it
router.put('/', (req, res) => {
  let body = req.body;
  tasks.push(body);
  console.log(`Id: ${body.id} Text: ${body.text}`);
  res.json({});
});

// On delete request:
router.delete('/', (req, res) => {
  let body = req.body;
  if (body.deleteAll) { // if there is deleteAll key in request body, then clear task list
    tasks= []; 
  } else {
    tasks.pop(); // else delete last task from list
  }
  console.log(`Delete all`);
  res.json({});
});

module.exports = router;
