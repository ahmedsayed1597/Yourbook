import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-account-password-change',
  templateUrl: './account-password-change.component.html',
  styleUrls: ['./account-password-change.component.css']
})



/////////////////////////////////////////////////////////////////
export class AccountPasswordChangeComponent implements OnInit {

  responseMessage: any

  constructor(private _AuthonticationService: ApiService, private _Router: Router, private fb:FormBuilder) { }
  // checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
  //   let pass = group.get('password').value;
  //   let confirmPass = group.get('RePassword').value
  //   return pass === confirmPass ? null : { notSame: true }
  // }

  // mustMatch: ValidatorFn= (group: AbstractControl):  ValidationErrors | null => (controlName:string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];
  
  //     if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
  //       return;
  //     }
  
  //     // set error on matchingControl if validation fails
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ mustMatch: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //     return null;
  //   };
  // }

  

  accountSetting:FormGroup = this.fb.group({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    RePassword: new FormControl('', [Validators.required]),
  },{validators: this.controlValuesAreEqual('newPassword', 'RePassword')});

  private controlValuesAreEqual(password: string, rePassword: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>{
      const formGroup = control as FormGroup
      const valueA = formGroup.get(password)?.value
      const valueB = formGroup.get(rePassword)?.value

      if(valueA == valueB){
        return null
      }
      else{
       return{valueDoesNotMatch :"Your Password doesn't Match"} 
      }
    }
  }

  onUpdatePassword(form: any) {
console.log(form)
    if (form.valid) {
      this._AuthonticationService.changePassword(form.value).subscribe({
        next: (response) => {
          this.responseMessage = response.message;
        }
        ,
        error: (err) => { console.log(err); }
      });
   }

  }

  // routeHomeIfUserExist(): boolean {
  //   // if (localStorage.getItem('token') !== null) { return true; }
  //   // else {
  //   //   return false
  //   // }
  // }


  ngOnInit(): void {
    // if (this.routeHomeIfUserExist()) {
    //   this._Router.navigate(['/home']);
    // }
  }

}
