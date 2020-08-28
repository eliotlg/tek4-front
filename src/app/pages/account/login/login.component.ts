import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { ToolbarService } from '../../../services/toolbar/toolbar.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { NetworkService } from '../../../services/network/network.service';
import { LoginCookieService } from '../../../services/cookie/login-cookie.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  matcher = new MyErrorStateMatcher();
  notmatch = false;

  constructor(
    public toolbarService: ToolbarService,
    private router: Router,
    private networkService: NetworkService,
    public loginCookieService: LoginCookieService
  ) { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    this.networkService.login({email: this.emailFormControl.value, password: this.passwordFormControl.value}).then(async (data: any) => {
      if (data.success == true) {
        await this.loginCookieService.setLogin(data.cookie);
        ;// redirect connected
      } else {
        this.notmatch = true;
      }
    }).catch((err: any) => {
      console.error(err);
    });
  }

  async forgotPassword(): Promise<void> {
    this.router.navigate(['account/forgot']).catch((err: any) => {
      console.error(err);
    });
  }

  async createAccount(): Promise<void> {
    this.router.navigate(['account/register']).catch((err: any) => {
      console.error(err);
    });
  }

}
