import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async login(){
    if (this.username && this.password) {
      this.auth.login(this.username, this.password).subscribe(res => {
        console.log(res);
      });
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: 'User name and password are required',
        buttons: ['Dismiss']
      });
      await alert.present();
    }
  }

}
