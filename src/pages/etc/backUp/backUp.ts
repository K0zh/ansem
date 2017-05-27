import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-backUp',
  templateUrl: 'backUp.html',
})
export class BackUpPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BackUpPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
