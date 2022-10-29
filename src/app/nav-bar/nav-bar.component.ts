import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userLogin: any = this._auth.isLogin.value;
  userName: any = this._auth.userName.value;


  constructor(private _auth: ApiService, private _Router: Router) {
    //this.userName = this._auth.userName;
    //this.userSecondName = this._auth.userSecondName;
    console.log(this.userLogin)
    this._auth.isLogin.subscribe((e) => { this.userLogin = e });
    this._auth.userName.subscribe((e) => { this.userName = e });

  }

  logOut() {
    this._auth.logOut();
    this._Router.navigate(['/Log_in'])
    this.userLogin = null;
    this.userName = '';

  }



  ngOnInit(): void {

  }

}
