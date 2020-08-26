import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { ToolbarService } from '../../../services/toolbar/toolbar.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

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

  constructor(
    public toolbarService: ToolbarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    console.log(this.emailFormControl.value);
    console.log(this.passwordFormControl.value);
    // backend login
  }

  async forgotPassword(): Promise<void> {
    console.log(this.emailFormControl.value);
    console.log(this.passwordFormControl.value);
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
