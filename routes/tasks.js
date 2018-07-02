var express = require('express');
var router = express.Router();

// connect to postgreSQL tasks database
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://express:express@localhost:5432/tasks");

var tasks = [];
db.any('SELECT * FROM tasks')
  .then((data) => {
    data.forEach((val) => {
      task = { 
        id : val.id,
        text : val.task_value
      }
      tasks.push(task);
    });
    console.log(tasks);
  })
  .catch((error) => console.log(error));

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
