import { Component, OnInit } from '@angular/core';
import { LoginCookieService } from '../../services/cookie/login-cookie.service';
import { NetworkService } from '../../services/network/network.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  public chatFormControl = new FormControl('');
  public id;

  constructor() { }

  ngOnInit(): void {
  }

  async chatSubmit(): Promise<void> {
    console.log(this.chatFormControl.value);
  }

}
