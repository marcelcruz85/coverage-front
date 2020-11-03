import { Router } from '@angular/router';
import { AnimationsService } from './../../_services/animations.service';
import { AlertService } from './../../_services/alert.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  email: string;

  constructor(
    private auth: AuthService,
    private alert: AlertService,
    private animation: AnimationsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async reset(){

    if (this.email) {
      this.animation.presentLoading('show');
      this.auth.forgot(this.email).subscribe(res => {
        this.animation.presentLoading('hide');
        this.alert.showAlert('Please check your emails for instructions').then( () => {
          this.router.navigateByUrl('/login', { replaceUrl: true });
        });
      }, async err => {
        this.animation.presentLoading('hide');
        this.alert.showAlert(err.error.message[0].messages[0].message);
      });
    } else {
      this.alert.showAlert('Email Address is Required');
    }
  }

}
