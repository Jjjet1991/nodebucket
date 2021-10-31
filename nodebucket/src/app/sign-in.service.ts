import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  //Create variable empId, which will be array of numbers
  empId: Array<number>;
  constructor() {
    //Assign employee Id predetermined values
    this.empId= [1007, 1008, 1009, 1010, 1011, 1012];
   }
   //Create new function validate takes in empId number
   validate(empId:number){
     //Looking that empId matches one of the predetermined values.
     return this.empId.some(id => id === empId);
   }
}
