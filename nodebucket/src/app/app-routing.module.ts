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

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthGuard } from './auth.guard';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
      },
      //Path for Contact Component
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [AuthGuard]
      },
      //Path for About Component
      {
        path: 'about',
        component: AboutComponent,
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
     },
     //Not-found path
     {
      path: 'not-found',
      component: NotFoundComponent
    }
   ]
 },
 //Redirect to sessions/not-found.
{
  path: '**',
  redirectTo: 'sessions/not-found'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

//Export AppRoutingModule class.
export class AppRoutingModule { }
