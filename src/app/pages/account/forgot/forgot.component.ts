import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { ToolbarService } from '../../../services/toolbar/toolbar.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
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
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();

  errorMessage = "";
  success = false;

  constructor(
    public toolbarService: ToolbarService,
    private router: Router,
    private networkService: NetworkService
  ) { }

  ngOnInit(): void {
  }

  async forgotAccount(): Promise<void> {
    this.networkService.forgotPassword({email: this.emailFormControl.value}).then((data: any) => {
      if (data.success == true) {
        this.success = true;
        this.errorMessage = "";
      } else {
        this.errorMessage = data.error;
        this.success = false;
      }
    }).catch((err: any) => {
      console.error(err);
    });
  }

}
