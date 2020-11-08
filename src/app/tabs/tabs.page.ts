import { AlertService } from './../_services/alert.service';
import { SocketService } from './../_services/socket.service';
import { Component, OnInit } from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  title = 'app';
  incomingmsg = [];
  msg = 'First Protocol';

  constructor(
    private badge: Badge,
    private socketService: SocketService,
    private alert: AlertService,
  ) {
    this.badge.set(5);
  }

  ngOnInit() {
    this.socketService
        .getMessage()
        .subscribe(msg => {
          console.log('Incoming msg', msg);
        });
    this.sendMsg(this.msg);
  }

  sendMsg(msg) {
    console.log('sdsd', msg);
    this.socketService.sendMessage(msg);
  }
}
