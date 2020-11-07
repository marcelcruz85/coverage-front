import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmAvailabilityPage } from './confirm-availability.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmAvailabilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmAvailabilityPageRoutingModule {}
