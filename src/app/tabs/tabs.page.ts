import { SocketService } from './../_services/socket.service';
import { Component, OnInit } from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

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
    private socketService: SocketService
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
    this.localNotification();
  }

  sendMsg(msg) {
    console.log('sdsd', msg);
    this.socketService.sendMessage(msg);
  }

  async localNotification(){
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Title",
          body: "Body",
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
    console.log('scheduled notifications', notifs);
  }
}
