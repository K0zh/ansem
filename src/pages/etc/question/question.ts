import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform} from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Firebase } from '@ionic-native/firebase';

@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  submission: any =  {
    writer : "",
    question : "",
    etc : "",
    date : new Date(),
    token : ""
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private firebase_DB: AngularFireDatabase,
    private firebase_native: Firebase,
    private platform: Platform
  ) {
    if(this.platform.is('cordova')) {
      firebase_native.getToken().then((token) => {
        this.submission.token = token;
      }).catch((error) => {
        console.error('Error getting token', error)
      });
    }
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendQuestion() {
    if(this.submission.writer === "" || this.submission.question === "") {
      return false;
    }
    const item = this.firebase_DB.list('/submission');
    item.push(this.submission);
    this.dismiss();
  }
}
