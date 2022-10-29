import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPasswordChangeComponent } from './account-password-change/account-password-change.component';
import { HomeNotesComponent } from './home/home-notes.component';
import { LogInComponent } from './log-in/log-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PathGuard } from './path.guard';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo:'Sign_up', pathMatch: 'full'},
  { path: 'Sign_up', component: SignUpComponent },
  { path: 'Log_in', component: LogInComponent },
  {path: 'home',  component: HomeNotesComponent , canActivate:[PathGuard]},
  {path: 'change_password',  component: AccountPasswordChangeComponent , canActivate:[PathGuard]},
  {path: 'profile',  component: ProfileComponent , canActivate:[PathGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
