import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required , Validators.min(10), Validators.max(90)]),
    password: new FormControl('', [Validators.required]),
  });

  responseMessage:any;
//Validators.pattern('//')

constructor(private _AuthonticationService:ApiService ,private  _Router:Router) {   }


  onSubmit(form:any){
     //registerationForm.valid
 if(form.valid == true){
      
      this._AuthonticationService.signUp(form.value).subscribe({
        next: (response) => {
          console.log(response);
          console.log(form);
          this.responseMessage = response.message;
          if(response.message == 'signup success'){
            this._Router.navigate(['Log_in'])
          }
        }
      ,
      error: (err) => {console.log(err);}
     });
     }
    //console.log(this.registerationForm);
  }

  btnDisable(form:any){

    if(form.invalid){
      if(form.touched)
      {return true;}
      else{return false;}
      
    }
  
    else{return false;}
  
  }

  routeHomeIfUserExist():boolean{
    if(localStorage.getItem('token') !== null) {return true;}
    else{
      return false
    }
  }

  

  ngOnInit(): void {
    if(this.routeHomeIfUserExist()){
      this._Router.navigate(['/home']);
    }
  }

}


