import { ConfirmAvailabilityPage } from './../../modals/confirm-availability/confirm-availability.page';
import { AnimationsService } from './../../_services/animations.service';
import { CourtsService } from './../../_services/courts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

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
    private modalController: ModalController,
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

  async confirmAvailability() {
    const modal = await this.modalController.create({
      component: ConfirmAvailabilityPage,
      cssClass: 'my-custom-class',
      componentProps: {
        id: this.courtEvent.id,
        confirmedAvialability: this.courtEvent.court_confirmed_assistance_c
      }
    });
    await modal.present();
    await modal.onWillDismiss().then(res => {
      if ( res.data ) {
        this.courtEvent.court_confirmed_assistance_c = res.data.confirmedAvialability;
      }
    });
  }

}
