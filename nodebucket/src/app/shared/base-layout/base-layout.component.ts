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

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}
