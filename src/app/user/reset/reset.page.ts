import { AlertService } from './../../_services/alert.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private alert: AlertService
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
        this.auth.reset(this.password, this.passwordConfirm, this.code).subscribe( res => {
          this.alert.showAlert('Your password have been reset');
        }, (err) => {
          this.alert.showAlert(err.error.message[0].messages[0].message);
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
