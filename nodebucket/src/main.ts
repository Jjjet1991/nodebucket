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

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
