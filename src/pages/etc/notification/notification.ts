import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LocalStorageProvider } from '../../../providers/local-storage';
import * as moment from 'moment';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  
  is_notification: boolean; // 알림 사용 여부
  notification_time: string; // 알림 시간
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private localNotifications: LocalNotifications,
    public localStorage: LocalStorageProvider
  ) {
    localStorage.selectNotification().then((data) => {
      if(data) {
        this.is_notification = data.isNotofication;
        this.notification_time = data.time;
      } else {
        this.notification_time = moment().format("HH:mm");
      }
    }).catch((error) => {
      
    });
  }

  ionViewDidLoad() {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  saveNotification() {
    if(this.is_notification) {
      const prev_time: string = this.notification_time;
      const prev_time_arr: Array<string> = prev_time.split(":");
      let new_time: Date = new Date();
      new_time.setHours(Number(prev_time_arr[0]));
      new_time.setMinutes(Number(prev_time_arr[1]));
      new_time.setSeconds(0);
      
      this.localNotifications.schedule({
        id: 1,
        title: "안셈 - 마음속의 생각",
        text: "오늘의 질문에 대답해보세요",
        every: "day",
        at: new_time
      });
      const param = {
        isNotofication: this.is_notification,
        time: this.notification_time
      };
      this.localStorage.saveNotification(param);
    } else {
      this.localNotifications.cancelAll();
      this.localNotifications.clearAll();
      this.localStorage.deleteNotification();
    }
    this.dismiss();
  }

}
