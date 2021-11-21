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

// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
