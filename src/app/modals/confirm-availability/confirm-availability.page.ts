import { AnimationsService } from './../../_services/animations.service';
import { CourtsService } from './../../_services/courts.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-availability',
  templateUrl: './confirm-availability.page.html',
  styleUrls: ['./confirm-availability.page.scss'],
})
export class ConfirmAvailabilityPage implements OnInit {
  @Input() id: string;
  @Input() confirmedAvialability: string;
  confirmed: string;

  constructor(
    private modal: ModalController,
    private courtService: CourtsService,
    private animation: AnimationsService
  ) { }

  ngOnInit() {
    this.confirmed = this.confirmedAvialability;
    console.log(this.id);
  }

  cancel(){
    this.modal.dismiss();
  }

  async save(){
    console.log(this.confirmedAvialability);
    await this.animation.presentLoading('show');
    this.courtService.updateCourt(this.id, {confirmedAvialability: this.confirmedAvialability}).subscribe(res => {
      this.animation.presentLoading('hide');
      this.modal.dismiss({
        confirmedAvialability: this.confirmedAvialability
      });
    }, err => console.log(err));
  }

}
