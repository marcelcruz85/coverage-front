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
  ) { }

  ngOnInit() {
  }

  async reset(){
    if (this.email) {
      this.auth.forgot(this.email).subscribe(res => {
        console.log(res);
      }, async err => {
        console.log(err);
        this.alert.showAlert(err.error.message[0].messages[0].message);
      });
    } else {
      this.alert.showAlert('Email Address is Required');
    }
  }

}
