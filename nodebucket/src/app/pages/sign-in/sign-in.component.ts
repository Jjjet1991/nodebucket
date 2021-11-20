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
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
//import { SignInService } from 'src/app/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  //Create variable for with value of FormGroup and variable error with string value.
  form: FormGroup;
  error: string;

  //Reference to imported modules in constructor
  constructor( private router: Router, private cookieService: CookieService,
     private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    //Validating that empID is a numerical value
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  //Create login function
  login() : void {
    const empId = this.form.controls['empId'].value;
    //Checks for numerical value entered

    this.http.get('/api/employees/' + empId).subscribe(res =>
      {
        if (res)
        {
          console.log(res);
          sessionStorage.setItem('name', `${res['firstName']} ${res['lastName']}`);
          //If value is entered navigates to HomeComponent
          this.cookieService.set('session_user', empId, 1);
          this.router.navigate(['/']);
        }
        //If nothing entered in empId displays error message that empId is invalid.
        else {
          this.error = 'The employee ID you entered is invalid, please try again';
        }
      })
    }

     //onSubmit capture the form values.
  /*onSubmit() {
    const formValues = this.form.value;
    //Parse string value to integer of studentId
    const empId = parseInt(formValues.empId);

    if (this.signinService.validate(empId)) {
      this.cookieService.set('session_user', empId.toString(), 1)
       //If the studentId is valid, take to home screen
      this.router.navigate(['/'])
    } else {
      //If studentId does not match, then display error message.
      this.error = `The student ID you entered is invalid, please try again.`;
    }
  }*/
}
