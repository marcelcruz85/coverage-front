import { AnimationsService } from './../../_services/animations.service';
import { AlertService } from './../../_services/alert.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  password: string;
  passwordConfirm: string;
  code: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private alert: AlertService,
    private router: Router,
    private animation: AnimationsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      if ( params ) {
        this.code = params.code;
        console.log(this.code);
      }
    });
  }

  reset(){
    if (this.password && this.passwordConfirm) {
      if (this.password === this.passwordConfirm) {
        this.animation.presentLoading('shoe');
        this.auth.reset(this.password, this.passwordConfirm, this.code).subscribe( res => {
          this.animation.presentLoading('hide');
          this.alert.showAlert('Your password have been reset, go to your Login page or open the App');
        }, (err) => {
          this.animation.presentLoading('hide');
          if (err.error.message[0].messages[0].message === 'Incorrect code provided.') {
            this.alert.showAlert('Link Expired, please try to resend the reset email again');
            this.router.navigateByUrl('/forgot', { replaceUrl: true });
          } else {
            this.alert.showAlert(err.error.message[0].messages[0].message);
          }
          console.log(err);
        });
      }else{
        this.alert.showAlert('Password doesn\'t match');
      }
    } else {
      this.alert.showAlert('All fields are required');
    }
  }

}
