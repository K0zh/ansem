import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { QuestionPage } from '../question/question';


@Component({
  selector: 'page-etc',
  templateUrl: 'etc.html',
})
export class EtcPage {
  pickTime: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
    ) {

      this.pickTime ="10:00";

  }

  openQuestion() {
    let modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }

}
