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

//Require statements for Mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create itemSchema with text string.
let itemSchema = new Schema({
  text: {type: String},
});

//Export module itemSchema(export as a module).
module.exports = itemSchema;

