import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
