import { AnimationsService } from './../../_services/animations.service';
import { Router } from '@angular/router';
import { AlertService } from './../../_services/alert.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(
    private auth: AuthService,
    private alert: AlertService,
    private router: Router,
    private animation: AnimationsService,
  ) { }

  ngOnInit() {
  }

  async login(){
    if (this.username && this.password) {
      this.animation.presentLoading('show');
      this.auth.login(this.username, this.password).subscribe(res => {
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        this.animation.presentLoading('hide');
      }, err => {
        this.alert.showAlert(err.error.message[0].messages[0].message);
        this.animation.presentLoading('hide');
      });
    } else {
      this.alert.showAlert('User name and password are required');
    }
  }

}
