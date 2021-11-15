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
import { Employee } from 'src/app/shared/interface/employee.interface';
import { Item } from 'src/app/shared/interface/item.interface';
import { TaskService } from 'src/app/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogueComponent } from 'src/app/shared/task-dialogue/task-dialogue.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  //Open Dialog when Task is created
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

    //Function to updated task lists.
updateTaskList(empId:number, todo:Item[], done:Item[]): void {
  this.taskService.updateTask(empId, todo, done).subscribe( res => {
    this.employee = res.data;
  }, err => {
    console.log(err)
  }, () => {
    this.todo = this.employee.todo;
    this.done = this.employee.done;
  })
}


  //Event for drag and drop
  drop(event: CdkDragDrop<any[]>) {

    //Move items within a container.
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('Reorder list of task items');

      this.updateTaskList(this.empId, this.todo, this.done);

      //Move tasks from one container to another.
    } else {
      transferArrayItem( event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                           event.currentIndex);

      console.log('Items moved.');

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  //Delete Tasks
  deleteTask( taskId: String) {
    //Confirm if the user wants to delete the selected task
    if(confirm('Are you sure you want to delete this task?')) {
      if(taskId) {
        //Logging that task was deleted
        console.log(`Task Id ${taskId} was deleted.`);
        //Subscribe to changes is employee todo and done to return updated todo and done data.
        this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err)
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    }

  }
}
