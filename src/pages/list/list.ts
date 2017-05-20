import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {CalendarController} from "ion2-calendar/dist";


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  pickDate: any;
  days: Array<any> = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendarCtrl: CalendarController
  ) {
    this.pickDate = "2017-05";
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
