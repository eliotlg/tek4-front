import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/pages/account/login/login.component';
import { CreateComponent } from 'src/app/pages/account/create/create.component';
import { ForgotComponent } from 'src/app/pages/account/forgot/forgot.component';

const routes: Routes = [

  /* Account management */
  {path: 'account/login', component: LoginComponent},
  {path: 'account/register', component: CreateComponent},
  {path: 'account/forgot', component: ForgotComponent},

  {path: '**', redirectTo: 'account/login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }