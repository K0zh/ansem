import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

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
