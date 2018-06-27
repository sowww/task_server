import React, { Component } from 'react';
import logo from './logo.svg';

// bootswatch theme for react-bootstrap
import "bootswatch/superhero/bootstrap.css";

import './App.css';

// react-bootstrap components
import { NavItem, Nav, Grid, Row, Col, Button, ButtonGroup, FormControl } from "react-bootstrap";

// Sends put request to Express server (/tasks) with new task information: random Id and text from input form
const sendNewTask = function (taskText) {
  if (taskText != "") {
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
    this.handleChange = this.handleChange.bind(this);
  }

  // On input text change sends new text into handler from props
  handleChange(event) {
    this.props.onTextChange(event.target.value);
  }

  render() {
    return (
      <FormControl
        type="text"
        placeholder="Enter text"
        // Set value from props
        value={this.props.value}
        // Set hendler from props
        onChange={this.handleChange}
      />
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setState({ textInput: "" });
  }

  // On input text change saves new text in state
  handleInputChange(text) {
    console.log("Apps handleInputChange");
    this.setState({ textInput: text });
  }

  // Clears input text field
  clearTextInput() {
    this.setState({ textInput: "" });
  }

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
    // Update list onMount
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
              <h1>Tasks</h1>
              <Nav
                bsStyle="pills"
                stacked
                onSelect={index => {
                  //this.setState({ activeIndex: index }); #TODO
                }}
              >
                {this.state.tasks.map(task =>
                  <NavItem className='task-item' key={task.id}>{task.text}</NavItem>
                )}
              </Nav>
              <br />
              <MyTextInput value={this.state.textInput} onTextChange={this.handleInputChange} />
              <br />
              <ButtonGroup vertical block>
                <Button
                  bsStyle="success"
                  onClick={() => {
                    console.log(this.state.textInput);
                    sendNewTask(this.state.textInput);
                    this.updateTaskList();
                    this.clearTextInput();
                  }}
                >
                  ADD TASK
                </Button>
                <Button
                  bsStyle="warning"
                  onClick={() => {
                    deleteLastTask();
                    this.updateTaskList();
                    console.log(this.state);
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