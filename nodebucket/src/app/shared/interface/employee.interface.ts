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

///Import Item interface
import { Item } from "./item.interface";

//Create Employee interface, empId, todo, done, and doing;
export interface Employee {
  empId : String;
  todo : Item[];
  done: Item [];
  doing: Item[];
}
