import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
