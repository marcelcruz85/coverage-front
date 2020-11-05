import { Injectable } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  loading;

  constructor(
    private animationCtrl: AnimationController,
    public loadingController: LoadingController
  ) { }

  hideTitle(element){
    const hideTitle: Animation = this.animationCtrl.create()
      .addElement(element)
      .duration(100)
      .fromTo('opacity', '1', '0');
    hideTitle.play();
  }

  showTitle(element){
    const showTitle: Animation = this.animationCtrl.create()
      .addElement(element)
      .duration(100)
      .fromTo('opacity', '0', '1');
    showTitle.play();
  }

  async presentLoading(op: string) {
    if ( op === 'show' ) {
      this.loading = await this.loadingController.create({
        cssClass: 'loading-clear',
        spinner: 'lines',
        // message: 'Please wait...',
        // duration: 2000
      });
      return await this.loading.present();
    } else if ( op === 'hide' ){
      await this.loading.dismiss();
    }

    // const { role, data } = await loading.onDidDismiss();

  }
}
