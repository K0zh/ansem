import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { NotificationPage } from './notification/notification';
import { BgmPage } from './bgm/bgm';
import { QuestionPage } from './question/question';
import { AppInfoPage } from './appInfo/appInfo';
import { BackUpPage } from './backUp/backUp';

import { LocalStorageProvider } from '../../providers/local-storage';
import { SQLiteProvider } from '../../providers/sqlite';

import { AppRate } from '@ionic-native/app-rate';


@Component({
  selector: 'page-etc',
  templateUrl: 'etc.html',
})
export class EtcPage {
  bg_url: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public localStorage: LocalStorageProvider,
    public sqlite: SQLiteProvider,
    private alertCtrl: AlertController,
    private platform: Platform,
    private localNotifications: LocalNotifications,
    private appRate: AppRate
  ) {
    localStorage.selectTodayBgImg().then((data) => {
      this.bg_url = "url(assets/images/bg/bg_img_" + data.bg_num + ".jpg)";
    }).catch((error) => {
      this.bg_url = "url(assets/images/bg/bg_img_1.jpg)";
    });
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

    this.appRate.preferences.storeAppURL = {
      android: 'market://details?id=com.breadnine.ansem',
    };
    this.appRate.promptForRating(true);
  }
  
  openBackUp() {
    const modal = this.modalCtrl.create(BackUpPage);
    modal.present();
  }
  
  openReset() {
    let confirm = this.alertCtrl.create({
      title: "초기화 하시겠습니까?",
      message: "중요한 데이터는 미리 백업하세요.",
      buttons: [
        {
          text: "취소",
          handler: () => {
          }
        },
        {
          text: "확인",
          handler: () => {
            this.localNotifications.cancelAll();
            this.localNotifications.clearAll();
            this.localStorage.deleteNotification();
            this.sqlite.deleteDB();
            this.localStorage.clearStorage();
            this.platform.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }

}
