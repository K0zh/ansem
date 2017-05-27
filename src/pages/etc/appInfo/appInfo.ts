import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-appInfo',
  templateUrl: 'appInfo.html',
})
export class AppInfoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppInfoPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
