import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private network: Network,
    private alertCtrl: AlertController,
  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {  //this.statusBar.backgroundColorByHexString('#171717');
      const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        let alert = this.alertCtrl.create({
          title: '알림',
          subTitle: "네트워크 상태를 확인해주세요",
          buttons: [{
            text: "확인",
            handler: () => {
              this.platform.exitApp();
            }
          }]
        });
        alert.present();
        disconnectSubscription.unsubscribe();
      });

      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    });
  }
  
}