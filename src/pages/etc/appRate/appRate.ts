import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-appRate',
  templateUrl: 'appRate.html',
})
export class AppRatePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppRatePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
