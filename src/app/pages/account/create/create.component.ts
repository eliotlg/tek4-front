import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { ToolbarService } from '../../../services/toolbar/toolbar.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

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

  constructor(
    public toolbarService: ToolbarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async register() {
    if (this.passwordFormControl.value != this.secondPasswordFormControl.value) {
      this.passwordMatchError = true;
    } else {
      this.passwordMatchError = false;
      // backend create
      this.router.navigate(['account/login']).catch((err: any) => {
        console.error(err);
      });  
    }
  }

}
