import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { LocalStorageProvider } from '../../providers/local-storage';

import { PostsPage } from '../posts/posts';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  question: FirebaseListObservable<any[]>;
  writer: String;
  
  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    public modalCtrl: ModalController,
    public localStorage: LocalStorageProvider
  ) {
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
    const param = {
      "question": this.question,
      "writer": this.writer,
      "posts_type": "write"
    }
    const modal = this.modalCtrl.create(PostsPage, param);
    modal.present();
  }
}
