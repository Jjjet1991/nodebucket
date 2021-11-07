/*
=====================================================
; Title: Web 450 nodebucket
; Author: Professor Krasso
; Date 7 November 2021
; Modified By: Jourdan Neal
; Description: Sprint 2 - Creating Home Page and Contact Page. Create task and display tasks.
=====================================================
*/
/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const employee = require('../src/app/models/employee');



/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */
const port = 3000; // server port

// Connect to MongoDB Database: nodebucket
const conn = 'mongodb+srv://admin:topsecret@cluster0.cs04f.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 */
app.get('/api/employees/:empId', async(req, res) => {
  try {
    employee.findOne({ 'empId': req.params.empId}, function(err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error!'
        })
      } else {
        console.log(employee);
        res.json(employee);
      }
    })
  } catch(e) {
    console.log(e);
    res.status(500).send({
      'message':'Internal server error!'
    })
  }
});

//findAllTasks API
app.get('/api/employees/:empId/tasks', async(req, res) => {
  try {
    //FindOne from params: empId, and respond with the empId, todo, and done portion of the Employee model.
    employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error!'
        })
      } else {
        console.log(employee);
        res.json(employee);
      }
    })
  } catch(e) {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error!'
    })
  }
});
//-----------------------------------------------------------//

//createTask API
app.post('/api/employees/:empId/tasks', async(req,res) => {
  try {
    employee.findOne({'empId': req.params.empId}, function(err, employee) {
      //If error return status 500 with Internal server error message.
      if (err) {
        console.log(err);
        res.status(500).send({
          'message' : 'Internal server error!'
        })
      }
      else {
        console.log(employee);

        //create newItem variable
        const newItem = {
          //Reference the text variable in the item module.
          text: req.body.text
        }

        //Push the newItem to the employee todo
        employee.todo.push(newItem);

        //Save updatedEmployee with the newItem variable that was added above.
        employee.save(function(err, updatedEmployee) {
          if (err) {
            console.log(err);
            res.status(500).send ({
              'message' : 'Internal server error!'
            })
          } else {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        })
      }
    })
  } catch(e){
    console.log(e);
    res.status(500). send({
      'message': 'Internal server error!'
    })
  }
});

//-----------------------------------------------------------//
/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
