/*
=====================================================
; Title: Web 450 nodebucket
; Author: Professor Krasso
; Date 7 November 2021
; Modified By: Jourdan Neal
; Description: Sprint 2 - Creating Home Page and Contact Page. Create task and display tasks.
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

