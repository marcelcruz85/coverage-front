import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private alert: AlertService
  ) {
    this.listenLocalNotifications();
  }

  async localNotification(notificationDate){
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Title",
          body: notificationDate,
          id: 1,
          schedule: { at: new Date(notificationDate) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: {
            route: '/whatever',
          }
        }
      ]
    });
    console.log('scheduled notifications', notifs);
  }

  listenLocalNotifications(){
    LocalNotifications.addListener('localNotificationActionPerformed', (res) => {
      this.alert.showAlert(JSON.stringify(res.notification));
      console.log(res.notification.extra);
    });
  }
}
