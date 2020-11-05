import { Component } from '@angular/core';
import { Badge } from '@ionic-native/badge/ngx';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private badge: Badge,
    private socket: Socket
  ) {
    this.badge.set(5);
  }

  sendMessage(msg: string){
    this.socket.emit('message', msg);
  }

  getMessage() {
      return this.socket
          .fromEvent('hello')
          .pipe(map((data) => {
            console.log(data);
          }));
  }
}
