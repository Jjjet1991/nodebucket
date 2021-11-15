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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './shared/interface/item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  //Call findAllTasks with empId, return http.get request on requested empId.
  findAllTasks(empId: number): Observable<any>{
    return this.http.get('/api/employees/' + empId + '/tasks');
  }
  //Call createTask with empId, return http.post request on requested empId.
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task
    })
  }

  //updateTask function.
  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }

  //deleteTask function, with empId: number and taskId: string
  deleteTask(empId: number, taskId: String): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}
