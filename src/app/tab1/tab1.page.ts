import { CourtsService } from './../_services/courts.service';
import { AuthService } from './../_services/auth.service';
import { AnimationsService } from './../_services/animations.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  titlehide = false;
  response;
  courtGroup = {
    group: null,
    events: []
  };

  courts = [];

  constructor(
    private animation: AnimationsService,
    private auth: AuthService,
    private router: Router,
    private courtService: CourtsService
  ) {}

  ngOnInit(){
    this.getUpcommingEvents();
  }

  logScrolling(ev){
    const element = document.getElementById('title-tab1');
    if (ev.detail.scrollTop > 37 && this.titlehide === false ) {
      this.titlehide = true;
      this.animation.showTitle(element);
    } else if (ev.detail.scrollTop < 38 && this.titlehide === true ) {
      this.titlehide = false;
      this.animation.hideTitle(element);
    }
  }

  async getUpcommingEvents(){
    await this.animation.presentLoading('show');
    this.courtService.findMyCourts().subscribe((res) => {
      console.log(res);
      this.response = res;

      this.response.forEach( el => {
        el.court_date_c = el.court_date_c.replace(/-/g, '/');

        // Checking for future events
        const today = new Date().toISOString().split('T')[0];
        const futDate: any = new Date(`${el.court_date_c} UTC`).toISOString().split('T')[0];
        if ( today === futDate) {
          el.pastDue = 'today';
        }else if ( today > futDate) {
          el.pastDue = 'past';
        } else {
          el.pastDue = 'future';
        }

        // Creating Groups
        const courtDate = new Date(`${el.court_date_c} UTC`).toLocaleDateString();
        el.time = new Date(`${el.court_date_c} UTC`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if ( this.courts.some( elem => elem.group === courtDate)) {
          this.courts.map( court => {
            if ( court.group === courtDate ) {
              court.events.push(el);
            }
          });
        } else {
          this.courts.push({group: courtDate, events: [el]});
        }
      });
      this.animation.presentLoading('hide');
    });
  }

  goToDetails(ev){
    const navigationExtras: NavigationExtras = {
      state: {
        court: ev.id
      }
    };
    this.router.navigate(['/event/details'], navigationExtras);
  }

}
