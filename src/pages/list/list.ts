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
  postsLists: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public platform: Platform,
    public sqlite: SQLiteProvider,
    private calendarCtrl: CalendarController
  ) {
    this.pickDate = "2017-05";
    // this.sqlite.create();

    this.sqlite.allSelect()
    .then(data => {
      console.log("000000");
      console.log(data);
      this.postsLists = data;
      console.log("1111111111");
      console.log(this.postsLists);
      console.log("2222222222222");
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter ListPage');
  }
  
  ionViewWillUnload() {
    console.log('ionViewWillUnload ListPage');
  }
  
  openPosts() {
    // let modal = this.modalCtrl.create(PostsPage, {"question": this.question, "writer": this.writer, "type": type});
    let modal = this.modalCtrl.create(PostsPage, {"question": "test1", "writer": "test2", "posts_type": "view"});
    modal.present();
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
