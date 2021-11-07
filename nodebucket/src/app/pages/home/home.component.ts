/*<!--
=====================================================
; Title: Web 450 nodebucket
; Author: Professor Krasso
; Date 31 October 2021
; Modified By: Jourdan Neal
; Description: Sprint 1 - application to sign in by employee ID, connect to MongoDB database.
=====================================================
*/

import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/interface/employee.interface';
import { Item } from 'src/app/shared/interface/item.interface';
import { TaskService } from 'src/app/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogueComponent } from 'src/app/shared/task-dialogue/task-dialogue.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //Create employee, todo, done and empId variables.
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  constructor( private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    //Call findAllTasks for requested empId.
    this.taskService.findAllTasks(this.empId).subscribe(res => {
       console.log('--Server response from findAllTasks--');
       console.log(res);
      //Return employee object and log to console.
       this.employee= res;
       console.log('--Employee object--');
       console.log(this.employee);
       //Error handling
    }, err => {
      console.log(err);
    }, ()=> {
      console.log('Inside the complete function of the findAllTasksAPI.');
    //Create todo and done variables for specified empId
    this.todo= this.employee.todo;
    this.done = this.employee.done;

    //Console log todo for empId and done for empId.
    console.log('--Todo tasks--');
    console.log(this.todo);

    console.log('--Done tasks');
    console.log(this.done);
    })
   }

  ngOnInit(): void {
  }

  openTaskDialogue() {
    const dialogRef = this.dialog.open(TaskDialogueComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }
}
