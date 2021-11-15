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

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a variable ItemDocument that references the item.js file.
const ItemDocument = require('./item');

let employeeSchema = new Schema({
  empId: {type: String, unique: true, dropDups: true},
  firstName: {type: String},
  lastName: {type: String},
  //Add to do and done ItemDocuments to employeeSchema
  todo: [ItemDocument],
  done: [ItemDocument]
  }, { collection: 'employees'})

  module.exports = mongoose.model('Employee', employeeSchema);
