import { Component, OnInit, Inject } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { delay } from 'q';
import { ToolbarService } from '../../services/toolbar/toolbar.service';

@Component({
  selector: 'tekfeed-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    public toolbarService: ToolbarService
  ) { }

  ngOnInit(): void {
  }

  goHome() {
    this.router.navigate(['home']).catch((error) => {
      console.error(error);
    });
  }

}
