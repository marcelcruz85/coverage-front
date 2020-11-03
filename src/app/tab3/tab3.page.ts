import { Router } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { AnimationsService } from './../_services/animations.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  titlehide = false;

  constructor(
    private animation: AnimationsService,
    private auth: AuthService,
    private router: Router
  ) {}

  logScrolling(ev){
    const element = document.getElementById('title-tab3');
    if (ev.detail.scrollTop > 37 && this.titlehide === false ) {
      this.titlehide = true;
      this.animation.showTitle(element);
    } else if (ev.detail.scrollTop < 38 && this.titlehide === true ) {
      this.titlehide = false;
      this.animation.hideTitle(element);
    }
  }

  async logout() {
    await this.auth.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
