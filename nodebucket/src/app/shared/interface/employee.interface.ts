/*
=====================================================
; Title: Web 450 nodebucket
; Author: Professor Krasso
; Date 7 November 2021
; Modified By: Jourdan Neal
; Description: Sprint 2 - Creating Home Page and Contact Page. Create task and display tasks.
=====================================================
*/

///Import Item interface
import { Item } from "./item.interface";

//Create Employee interface, empId, todo, done.
export interface Employee {
  empId : String;
  todo : Item[];
  done: Item []
}
