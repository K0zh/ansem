import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { CalendarController } from "ion2-calendar/dist";

import { PostsPage } from '../posts/posts';

import { Platform } from 'ionic-angular';
import { SQLiteProvider } from '../../providers/sqlite';
import * as moment from 'moment';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  pickDate: any;
  days: Array<any> = [];
  postsList: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public platform: Platform,
    public sqlite: SQLiteProvider,
    private calendarCtrl: CalendarController
  ) {
    this.pickDate = "2017-05";
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  
  ionViewWillEnter() {
    this.sqlite.selectAll().then(data => {
      this.postsList = data;
    }).catch(e => {
      console.log(e);
    })
  }
  
  ionViewWillUnload() {
    console.log('ionViewWillUnload ListPage');
  }
  
  openPosts(reg_dt: String) {
    let posts_question;
    let posts_contents;
    let posts_type;
    console.log(reg_dt);

    this.sqlite.selectCheckToday(reg_dt).then(data => {
      posts_question = data[0].QUESTION;
      posts_contents = data[0].CONTENTS;
      posts_type = "view"

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

  
  daysConfig() {
    let _daysConfig = [
      {
        date:new Date(2017,1,1),
        subTitle:'New Year\'s',
        marked:true,
        cssClass:'day-danger',
      },
      {
        date:new Date(2017,1,14),
        subTitle:'Valentine\'s',
      },
      {
        date:new Date(2017,3,1),
        subTitle:'April Fools',
        marked:true
      },
      {
        date:new Date(2017,3,7),
        subTitle:'World Health',
      },
      {
        date:new Date(2017,4,31),
        subTitle:'No-Smoking',
      },
      {
        date:new Date(2017,5,1),
        subTitle:'Children\'s',
      }
    ];

//    for(let i = 0;  i < 31; i++){
//      this.days.push({
//        date:new Date(2017,0,i+1),
//        subTitle:`$${i+1}`
//      })
//    }

    //_daysConfig.push(...this.days);

    this.calendarCtrl.openCalendar({
      title: '전체보기',
      monthTitle: 'yyyy년 MM월',
      weekdaysTitle: ["일", "월", "화", "수", "목", "금", "토"],
      closeLabel: '취소',
      from: new Date(2017,0,1),
      to: new Date(),
      defaultDate: new Date(),
      cssClass: 'my-class',
      daysConfig: _daysConfig
    }).then((res:any) => {
      //alert(1);
      console.log(res);
    }).catch((res:any) => {
      console.log(res);
    });
  }

}
