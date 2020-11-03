import { Router } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { AnimationsService } from './../_services/animations.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  titlehide = false;

  constructor(
    private animation: AnimationsService,
    private auth: AuthService,
    private router: Router
  ) {}

  logScrolling(ev){
    const element = document.getElementById('title-tab2');
    if (ev.detail.scrollTop > 37 && this.titlehide === false ) {
      this.titlehide = true;
      this.animation.showTitle(element);
    } else if (ev.detail.scrollTop < 38 && this.titlehide === true ) {
      this.titlehide = false;
      this.animation.hideTitle(element);
    }
  }
}
