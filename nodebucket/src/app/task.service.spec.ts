/*
=====================================================
; Title: Web 450 nodebucket
; Author: Professor Krasso
; Date 21 November 2021
; Modified By: Jourdan Neal
; Description: Deployment, completed project. Tasks can be created by the user
; from there moved between To Do, Doing and Done columns. Tasks can be deleted
; by selecting the trash can icon. Tasks can also be re-arranged within each column.
; Users sign in and the signed in under the profile icon.
=====================================================
*/

import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
