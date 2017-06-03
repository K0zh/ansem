import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import * as moment from 'moment';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  
  is_notification: boolean;
  notification_time: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.notification_time = moment().format("HH:mm");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
