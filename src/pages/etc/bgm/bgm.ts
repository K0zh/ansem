import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-bgm',
  templateUrl: 'bgm.html',
})
export class BgmPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BgmPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
