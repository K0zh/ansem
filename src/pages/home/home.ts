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
      console.log("====== (홈) 질문 로드 에러 ======");
      console.log(error);
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
        "posts_type": posts_type
      }

      const modal = this.modalCtrl.create(PostsPage, param);
      modal.present();
      
    }).catch(e => {
      console.log(e);
    });
  }
}