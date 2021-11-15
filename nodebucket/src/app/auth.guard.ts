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
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService){

  }
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const sessionUser = this.cookieService.get('session_user');
    //It the sessionUser returns true launch cookieService and continue to HomePage
    if (sessionUser) {
      return true;
    } else {
      //Redirect user back to signin page.
      this.router.navigate(['/session/signin']);

      return false;
    }
  }
}
