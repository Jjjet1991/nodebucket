/*<!--
=====================================================
; Title: Web 450 nodebucket
; Author: Professor Krasso
; Date 31 October 2021
; Modified By: Jourdan Neal
; Description: Sprint 1 - application to sign in by employee ID, connect to MongoDB database.
=====================================================
*/

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthGuard } from './auth.guard';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      //Path for HomeComponent
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  //Path to launch AuthLayoutComponent, which contains router-outlet to display child SignInComponent.
 {
   path: 'session',
   component: AuthLayoutComponent,
   children: [
     {
       path: 'signin',
       component: SignInComponent
     }
   ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

//Export AppRoutingModule class.
export class AppRoutingModule { }
