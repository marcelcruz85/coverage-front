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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      if ( params ) {
        this.code = params.code;
        // console.log(params);
        // const queryParams = JSON.parse(params);
        // console.log(queryParams);
      }
    });
  }

  async reset(){
    this.auth.reset(this.password, this.passwordConfirm, this.code).subscribe(res => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

}
