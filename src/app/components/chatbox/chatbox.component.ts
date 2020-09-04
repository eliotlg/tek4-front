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

  chatFormControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
