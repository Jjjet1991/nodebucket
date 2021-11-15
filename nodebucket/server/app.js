/*
=====================================================
; Title: Web 450 nodebucket
; Author: Professor Krasso
; Date 14 November 2021
; Modified By: Jourdan Neal
; Description: Sprint 3 - Delete Task, Update Task. Drag and Drop function to move tasks between
; the columns and re-order the tasks within a column. Create About and 404 Not Found Page.
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
const Employee = require('../src/app/models/employee');
const { requiredPaths } = require('../src/app/models/item');
const { findById } = require('../src/app/models/employee');
const { Router } = require('express');
const { builtinModules } = require('module');




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
    Employee.findOne({ 'empId': req.params.empId}, function(err, employee) {
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
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
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
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
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

//----------------------------------------------//
//--updateTask API--//
app.put('/api/employees/:empId/tasks', async(req,res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err){
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error!'
        })
      } else {
        console.log(employee);

        employee.set({
          todo: req.body.todo,
          done: req.body.done
        });

        employee.save(function(err, updatedEmployee) {
          if (err) {
            console.log(err);
            res.status(500).send({
              'message': 'Internal server error!'
            })
          } else {
            console.log(updatedEmployee);
            res.status(200).send({
              'message': 'Employee Updated!'
            })
          }
        })
      }
    })
  }
  catch (e){
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error!'
    })
  }
})

//-----------------------------------------------------------//
// deleteTask API-- 1. find employee, 2. find tasks associated with employee (sub document), 3. .remove() todo/done task
app.delete('/api/employees/:empId/tasks/:taskId', async(req,res) => {
  //Try/catch bock
  try{
    //Find one and delete task by taskId
    Employee.findOne({'empId': req.params.empId}, function(err,employee) {
      if(err){
        console.log(err);
        res.status(500).send({
          'message':'Internal server error.'
        })
      } else {
        //Create const todo Items, look at employee documents to find the taskId.
        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        //Looking for the same items by Id this time in done status.
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        //If the task Id is valid.
        if (todoItem) {
          //Remove the corresponding taskId.
          employee.todo.id(todoItem._id).remove();

          //Save updated employee record after deleting task.
          employee.save(function(err, updatedTodoItemEmployee) {
            //If err, log err and respond w/ message.
            if (err) {
              console.log(err);
              res.status(500).send ({
                'message': 'Internal server error.'
              })
            } else {
              console.log(updatedTodoItemEmployee);
              res.status(200).send ({
                'message': 'To Do Task deleted.'
              })
            }
          })
        } else if (doneItem) {
          //If valid id in done status, remove.
          employee.done.id(done._id).remove()

          //Save updated employee record.
          employee.save(function(err,updatedDoneItemEmployee) {
            if (err) {
              console.log(err);
              res.status(500).send ({
                'message': 'Internal server error.'
              })
            } else {
              console.log(updatedDoneItemEmployee);
              res.status(200).send ({
                'message': 'Done Task Deleted'
              })
            }
          })
        } else {
          console.log('Invalid Task Id:' + req.params.taskId);
          res.status (300). send({
            'message': 'Task not Found.'})
        }
      }
    })
  }
  catch(e){
    console.log(e);
    res.status(200).send({
      'message':'Internal server error!'
    })
  }
})



//----------------------------------------------//
/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
