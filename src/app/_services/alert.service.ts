import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController
  ) { }

  async showAlert(message: string){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message,
      buttons: ['Dismiss']
    });
    await alert.present();
  }
}
