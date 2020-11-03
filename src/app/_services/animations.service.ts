import { Injectable } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor(
    private animationCtrl: AnimationController
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
}
