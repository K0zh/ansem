import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PostsPage } from '../posts/posts';

import { Platform } from 'ionic-angular';
import { SQLiteProvider } from '../../providers/sqlite';
import * as moment from 'moment';

import { LocalStorageProvider } from '../../providers/local-storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  
  pickDate: any;
  days: Array<any> = [];
  postsLists: any;
  postsList: any;
  bg_url: String;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public platform: Platform,
    public sqlite: SQLiteProvider,
    public localStorage: LocalStorageProvider
  ) {
    localStorage.selectTodayBgImg().then((data) => {
      this.bg_url = "url(assets/images/bg/bg_img_" + data.bg_num + ".jpg)";
    }).catch((error) => {
      this.bg_url = "url(assets/images/bg/bg_img_1.jpg)";
    });
    
    this.pickDate = moment().format("YYYY-MM");
  }
  

  ionViewDidLoad() {
  }
  
  ionViewWillEnter() {
    this.selectMonthPosts();
  }
  
  selectMonthPosts() {
    this.sqlite.selectMonth(this.pickDate).then(data => {
      this.postsList = data;
    }).catch(e => {
      console.log(e);
    })
  }
  
  openPosts(reg_dt: String) {
    let posts_question;
    let posts_contents;
    let posts_type;

    this.sqlite.selectCheckToday(reg_dt).then(data => {
      posts_question = data[0].QUESTION;
      posts_contents = data[0].CONTENTS;
      posts_type = "view";

      const param = {
        "question": posts_question,
        "contents": posts_contents,
        "posts_type": posts_type,
        "reg_dt" : reg_dt
      }

      const modal = this.modalCtrl.create(PostsPage, param);
      modal.onDidDismiss(data => {

        if(data && data.deleteCheck) {
          this.selectMonthPosts();
        }
      });
      modal.present();
      
      
    }).catch(e => {
      console.log(e);
    });
  }
}
