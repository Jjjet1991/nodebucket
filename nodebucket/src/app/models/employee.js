/*<!--
=====================================================
; Title: Web 450 nodebucket
; Author: Professor Krasso
; Date 31 October 2021
; Modified By: Jourdan Neal
; Description: Sprint 1 - application to sign in by employee ID, connect to MongoDB database.
=====================================================
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
  empId: {type: String, unique: true, dropDups: true},
  firstName: {type: String},
  lastName: {type: String}
  }, { collection: 'employees'})

  module.exports = mongoose.model('Employee', employeeSchema);
