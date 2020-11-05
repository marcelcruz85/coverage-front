import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) { }

  sendMessage(msg: string){
    this.socket.emit('hello', msg);
  }

  getMessage() {
      return this.socket
          .fromEvent('hello')
          .pipe(map((data) => data));
  }
}
