import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Injectable()
export class AdProvider {

  constructor(
    private admobFree: AdMobFree
  ) {
    
  }

  setAdConfig() {
    const interstitailConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-4139703854678189/7440101759',
      isTesting: false,
      autoShow: false
    };
    this.admobFree.interstitial.config(interstitailConfig);
    this.admobFree.interstitial.prepare().then((s) => {
      console.log("AdMob prepare : ", s);
    }).catch(e => console.log(e));
  }

  showAdInterstitial() {
    this.admobFree.interstitial.show().then((s) => {
      console.log("AdMob show : ", s);
    }).catch((e) => {
      console.log("AdMob error : ", e);
    });
  }

}
