import { AnimationsService } from './../../_services/animations.service';
import { CourtsService } from './../../_services/courts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  courtEvent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courtService: CourtsService,
    private animation: AnimationsService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.courtEvent = this.router.getCurrentNavigation().extras.state.court;
      }
    });
  }

  ngOnInit() {
    this.getCourtEvent();
  }

  async getCourtEvent(){
    await this.animation.presentLoading('show');
    this.courtService.findOneCourt(this.courtEvent).subscribe(res => {
      console.log(res);
      this.courtEvent = res;
      this.courtEvent.court_date = new Date(`${this.courtEvent.court_date_c.replace(/-/g, '/')} UTC`).toLocaleDateString();
      this.courtEvent.court_time = new Date(`${this.courtEvent.court_date_c.replace(/-/g, '/')} UTC`).toLocaleTimeString();
      this.animation.presentLoading('hide');
    }, err => console.log(err));
  }

}
