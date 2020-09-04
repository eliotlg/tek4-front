import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ToolbarService } from '../../services/toolbar/toolbar.service';
import { Router } from '@angular/router';
import { NetworkService } from '../../services/network/network.service';
import { ChatboxComponent } from '../../components/chatbox/chatbox.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public toolbarService: ToolbarService,
    private router: Router,
    private networkService: NetworkService) { }

  ngOnInit(): void {
  }

}
