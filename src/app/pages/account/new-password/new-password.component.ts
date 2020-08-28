import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { ToolbarService } from '../../../services/toolbar/toolbar.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NetworkService } from '../../../services/network/network.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  secondPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  matcher = new MyErrorStateMatcher();

  passwordMatchError = false;

  success = false;

  constructor(
    public toolbarService: ToolbarService,
    private router: Router,
    private networkService: NetworkService
  ) { }

  ngOnInit(): void {
  }

  async newPassword() {
    if (this.passwordFormControl.value != this.secondPasswordFormControl.value) {
      this.passwordMatchError = true;
    } else {
      this.passwordMatchError = false;
      this.networkService.newPassword({password: this.passwordFormControl.value, forgotHash: this.router.url.split('/')[3]}).then((data: any) => {
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['account/login']).catch((err: any) => {
            console.error(err);
          });
        }, 5000);
      }).catch((err: any) => {
        console.error(err);
      })
    }
  }

}
