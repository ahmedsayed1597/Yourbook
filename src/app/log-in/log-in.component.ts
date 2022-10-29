import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  responseMessage: any

  logInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,]),
  });

  constructor(private _AuthonticationService: ApiService, private _Router: Router) { }

  onLogIn(form: any) {

    if (form.valid) {
      this._AuthonticationService.signIn(form.value).subscribe({
        next: (response) => {
          this.responseMessage = response.message;
          if (response.message == 'signin success') {
            localStorage.setItem('token', response.token);
            this._AuthonticationService.getCurrentUser()
            this._Router.navigate(['/home'])
          }
        }
        ,
        error: (err) => { console.log(err); }
      });
    }

  }

  routeHomeIfUserExist(): boolean {
    if (localStorage.getItem('token') !== null) { return true; }
    else {
      return false
    }
  }


  ngOnInit(): void {
    if (this.routeHomeIfUserExist()) {
      this._AuthonticationService.getCurrentUser()
      this._Router.navigate(['/home']);
    }
  }

}




