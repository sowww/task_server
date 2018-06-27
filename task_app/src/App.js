import React, { Component } from 'react';
import logo from './logo.svg';

// bootswatch theme for react-bootstrap
import "bootswatch/superhero/bootstrap.css";

import './App.css';

import { Navbar, NavItem, Nav, Grid, Row, Col, Button, ButtonGroup, FormControl } from "react-bootstrap";

// Variable to store text from input form
var textInputString = ""

// Sends put request to Express server (/tasks) with new task information: random Id and text from input form
const sendNewTask = function (taskText) {
  fetch('/tasks',
    {
      method: "put",
      body: JSON.stringify({ id: Math.floor(Math.random() * 1000), text: taskText }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
}

// Sends delete request to Express server (/tasks) with deleteAll key
const clearTaskList = function () {
  fetch('/tasks',
    {
      method: "delete",
      body: JSON.stringify({ deleteAll: true }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
}

// Sends delete request to Express server (/tasks)
const deleteLastTask = function () {
  fetch('/tasks',
    {
      method: "delete",
      body: JSON.stringify({ deleteAll: false }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
}

// Text Input class to track input text value
class MyTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    // Send input text to global variable
    textInputString = event.target.value;
  }

  render() {
    return (
      <FormControl
        type="text"
        placeholder="Enter text"
        onChange={this.handleChange}
      />
    );
  }
}

class App extends Component {
  state = { tasks: [] };

  // Sends get request to get tasks json from Expres server and use it to update our list
  updateTaskList() {
    fetch('/tasks')
      .then(res => res.json())
      .then((tasks) => {
        this.setState({ tasks });
        console.log(JSON.stringify(this.state));
      });
  }

  componentDidMount() {
    // Update onMount
    this.updateTaskList();
  }

  // Main appearence
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Task list application</h1>
        </header>
        <Grid>
          <Row>
            <Col md={4} sm={4} />
            <Col md={4} sm={4}>
              <Nav
                bsStyle="pills"
                stacked
                onSelect={index => {
                  //this.setState({ activeIndex: index });
                }}
              >
                <h1>Tasks</h1>
                {this.state.tasks.map(task =>
                  <NavItem className='task-item' key={task.id}>{task.text}</NavItem>
                )}
              </Nav>
              <br />
              <MyTextInput />
              <br />
              <ButtonGroup vertical block>
                <Button
                  bsStyle="success"
                  onClick={() => {
                    console.log(textInputString);
                    sendNewTask(textInputString);
                    this.updateTaskList();
                  }}
                >
                  ADD TASK
                </Button>
                <Button
                  bsStyle="warning"
                  onClick={() => {
                    deleteLastTask();
                    this.updateTaskList();
                  }}
                >
                  DELETE LAST TASK
                </Button>
                <Button
                  bsStyle="danger"
                  onClick={() => {
                    clearTaskList();
                    this.updateTaskList();
                  }}
                >
                  CLEAR LIST
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;