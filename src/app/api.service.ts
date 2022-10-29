import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  isLogin = new BehaviorSubject(null);
  token: any = '';
  //isLogin:any;
  userName = new BehaviorSubject(null);


  constructor(private _HttpClient: HttpClient) {
    this.getCurrentUser();
    console.log(this.isLogin)
  }


  getCurrentUser(){
     this.token= localStorage.getItem('token');
    if (this.token != null) {
      this.isLogin.next(this.token);

      let token_decode: any = jwtDecode(this.token);
     // console.log(token_decode);
      this.userName.next(token_decode.name);
      
      
    }
  
  }

  signUp(userData: any): Observable<any> {
    return this._HttpClient.post('https://yourbok.herokuapp.com/users/signup', userData);
  }

  signIn(userData: any): Observable<any> {
    return this._HttpClient.post('https://yourbok.herokuapp.com/users/signin', userData);
  }

  changePassword(userData: any): Observable<any> {
    return this._HttpClient.put('https://yourbok.herokuapp.com/users/changePassword', userData, {
      headers : new HttpHeaders({

        'Content-Type': 'application/json',
  
        'token': this.token
  
      }),
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.isLogin.next(null);
    this.userName.next(null);

  }
}
