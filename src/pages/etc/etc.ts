import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { NotificationPage } from './notification/notification';
import { BgmPage } from './bgm/bgm';
import { QuestionPage } from './question/question';
import { AppInfoPage } from './appInfo/appInfo';
import { AppRatePage } from './appRate/appRate';
import { BackUpPage } from './backUp/backUp';
import { ResetPage } from './reset/reset';


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

  openNotification() {
    const modal = this.modalCtrl.create(NotificationPage);
    modal.present();
  }
  
  openBgm() {
    const modal = this.modalCtrl.create(BgmPage);
    modal.present();
  }
  
  openQuestion() {
    const modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }
  
  openAppInfo() {
    const modal = this.modalCtrl.create(AppInfoPage);
    modal.present();
  }
  
  openAppRate() {
    const modal = this.modalCtrl.create(AppRatePage);
    modal.present();
  }
  
  openBackUp() {
    const modal = this.modalCtrl.create(BackUpPage);
    modal.present();
  }
  
  openReset() {
    const modal = this.modalCtrl.create(ResetPage);
    modal.present();
  }

}
