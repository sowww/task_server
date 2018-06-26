import React, { Component } from 'react';
import logo from './logo.svg';


import "bootswatch/yeti/bootstrap.css";

import './App.css';

import { Navbar, NavItem, Nav, Grid, Row, Col, Button, ButtonGroup, FormControl } from "react-bootstrap";



class App extends Component {
  state = { tasks: [] };

  componentDidMount() {
    fetch('/tasks')
      .then(res => res.json())
      .then((tasks) => {
        this.setState({ tasks });
        console.log(JSON.stringify(this.state));
      });
  }

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
                //activeKey={activeCity}
                onSelect={index => {
                  //this.setState({ activeCity: index });
                }}
              >
                <h1>Tasks</h1>
                {this.state.tasks.map(task =>
                  <NavItem class='task-item' key={task.id}>{task.text}</NavItem>
                )}
              </Nav>
              <br />
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={(evt) => {

                }}
              />
              <FormControl.Feedback />
              <br />
              <ButtonGroup vertical block>
                <Button
                  bsStyle="success"
                >
                  ADD TASK
                </Button>
                <Button
                  bsStyle="warning"
                >
                  DELETE TASK
                </Button>
                <Button
                  bsStyle="danger"
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
