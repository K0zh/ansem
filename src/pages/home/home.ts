import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { LocalStorageProvider } from '../../providers/local-storage';
import { SQLiteProvider } from '../../providers/sqlite';
import * as moment from 'moment';

import { PostsPage } from '../posts/posts';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  question: FirebaseListObservable<any[]>;
  writer: String;
  today: String;
  bg_url: String;
  
  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    public modalCtrl: ModalController,
    public sqlite: SQLiteProvider,
    public localStorage: LocalStorageProvider
  ) {
    this.today = moment().format('YYYY-MM-DD');
    
    localStorage.selectTodayQuestion().then(data => {
      this.question = data.question;
      this.writer = data.writer;
    }).catch((error) => {
      console.log(error);
    });
      
    localStorage.selectTodayBgImg().then((data) => {
      this.bg_url = "url(assets/images/bg/bg_img_" + data.bg_num + ".jpg)";
    }).catch((error) => {
      this.bg_url = "url(assets/images/bg/bg_img_1.jpg)";
    });
    
  }

  ionViewDidLoad() {
    
  }
  
  openPosts() {
    let posts_question: FirebaseListObservable<any[]>;
    let posts_contents;
    let posts_type;

    this.sqlite.selectCheckToday(this.today).then(data => {

      if(data === 0) {
        posts_question = this.question;
        posts_contents = "";
        posts_type = "write"

      } else {
        posts_question = data[0].QUESTION;
        posts_contents = data[0].CONTENTS;
        posts_type = "view"
      }

      const param = {
        "question": posts_question,
        "contents": posts_contents,
        "posts_type": posts_type,
        "reg_dt" : this.today
      }

      const modal = this.modalCtrl.create(PostsPage, param);
      modal.present();
      
    }).catch(e => {
      console.log(e);
    });
  }
}