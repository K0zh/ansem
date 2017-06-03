import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  
  is_notification:boolean;
  notification_time:any = "15:00";
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
