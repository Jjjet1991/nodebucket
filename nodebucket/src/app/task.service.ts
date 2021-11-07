/*<!--
=====================================================
; Title: Web 450 nodebucket
; Author: Professor Krasso
; Date 31 October 2021
; Modified By: Jourdan Neal
; Description: Sprint 2 - application to sign in by employee ID, connect to MongoDB database.
=====================================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
