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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
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

  errorMessage = "";
  success = false;

  constructor(
    public toolbarService: ToolbarService,
    private router: Router,
    private networkService: NetworkService
  ) { }

  ngOnInit(): void {
  }

  async register(): Promise<void> {
    if (this.passwordFormControl.value != this.secondPasswordFormControl.value) {
      this.passwordMatchError = true;
    } else {
      this.passwordMatchError = false;
      this.networkService.create({email: this.emailFormControl.value, password: this.passwordFormControl.value}).then((data: any) => {
        if (data.success == true) {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['account/login']).catch((err: any) => {
              console.error(err);
            });
          }, 5000);
        } else {
          this.errorMessage = data.error;
        }
      }).catch((err: any) => {
        console.error(err);
        this.errorMessage = "An Error has occurred";
      })
    }
  }

}
