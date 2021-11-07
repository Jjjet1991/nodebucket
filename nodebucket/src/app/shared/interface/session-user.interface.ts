/*
=====================================================
; Title: Web 450 nodebucket
; Author: Professor Krasso
; Date 7 November 2021
; Modified By: Jourdan Neal
; Description: Sprint 2 - application to sign in by employee ID, connect to MongoDB database.
=====================================================
*/

//Export SessionUser interface, empId, firstName, and lastName.
export interface SessionUser {
  empId : string;
  firstName: string;
  lastName: string
}
