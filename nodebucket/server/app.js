/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

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
app.get('/api/employees/:empId', async(req, res) =>{
  //Try, Catch block.
  try {
    //findOne 'empId' from req params.
    Employee.findOne({ 'empId': req.params.empId}, function(err, employee) {
      //If error log status 500 and send error message.
      if (err) {
        console.log(err);
        res.status(500).send({
          'message': 'Internal server error!'
        })
        //It emp ID is successful console log the employee, return employee json info.
      } else {
        console.log(employee);
        res.json(employee)
      }
    })
    //Catch error, return error message.
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error!'
    })
  }
});

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
