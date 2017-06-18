import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';

import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-appInfo',
  templateUrl: 'appInfo.html',
})
export class AppInfoPage {
  appInformation: object = {
    name : "",
    version : ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private appVersion: AppVersion,
    private platform: Platform
  ) {
    if (this.platform.is('cordova')) {
      this.appVersion.getAppName().then((value) => {
        this.appInformation["name"] = value;
      }).catch(() => {
        //TODO: 에러 Alert 작성
      });
      this.appVersion.getVersionNumber().then((value) => {
        this.appInformation["version"] = value;
      }).catch(() => {
        //TODO: 에러 Alert 작성
      });
    }
  }

  ionViewDidLoad() {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
