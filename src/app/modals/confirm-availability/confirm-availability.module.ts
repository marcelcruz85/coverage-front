import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmAvailabilityPageRoutingModule } from './confirm-availability-routing.module';

import { ConfirmAvailabilityPage } from './confirm-availability.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmAvailabilityPageRoutingModule
  ],
  declarations: [ConfirmAvailabilityPage]
})
export class ConfirmAvailabilityPageModule {}
