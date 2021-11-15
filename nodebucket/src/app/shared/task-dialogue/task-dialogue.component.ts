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

import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-task-dialogue',
  templateUrl: './task-dialogue.component.html',
  styleUrls: ['./task-dialogue.component.css']
})
export class TaskDialogueComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<TaskDialogueComponent>, private fb: FormBuilder ) { }


  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }

     createTask() {
       this.dialogRef.close(this.taskForm.value);
       console.log(this.taskForm.value);
     }

     cancel(){
       this.dialogRef.close();
     }
  }
