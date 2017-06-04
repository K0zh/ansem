import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { NotificationPage } from './notification/notification';
import { BgmPage } from './bgm/bgm';
import { QuestionPage } from './question/question';
import { AppInfoPage } from './appInfo/appInfo';
import { BackUpPage } from './backUp/backUp';

import { LocalStorageProvider } from '../../providers/local-storage';

@Component({
  selector: 'page-etc',
  templateUrl: 'etc.html',
})
export class EtcPage {
  pickTime: any;
  bg_url: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public localStorage: LocalStorageProvider
  ) {
    localStorage.selectTodayBgImg().then((data) => {
      this.bg_url = "url(assets/images/bg/bg_img_" + data.bg_num + ".jpg)";
    }).catch((error) => {
      this.bg_url = "url(assets/images/bg/bg_img_1.jpg)";
    });
    
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
    
  }
  
  openBackUp() {
    const modal = this.modalCtrl.create(BackUpPage);
    modal.present();
  }
  
  openReset() {
    
  }

}
