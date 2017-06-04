import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Injectable()
export class LocalStorageProvider {

  constructor(
    private firebase_DB: AngularFireDatabase,
    private storage: Storage
  ) {
    
  }

  // 오늘 질문 구하기
  selectTodayQuestion(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('today_question').then((val) => {
        const today_date = moment().format("D"); // 오늘 date
        let param = {
          question: "",
          writer: "",
          date: today_date
        }
        if(!val || today_date !== val.date) { // 오늘 date와 등록된 date가 다르면
          const month: String = "m_1";  // 월 테스트
          //const month: String = "m_" + moment().format("M");  // 월
          const date: String = "d_1"; // 일 테스트
          //const date: String = "d_" + today_date; // 일
          const random: Number = Math.floor(Math.random() * 1) + 1; // 랜덤난수
          const question: String = "q_" + random; // 질문
          const query: any = '/' + month + '/' + date + '/' + question;
          const selectQuestion = this.firebase_DB.list(query, { preserveSnapshot: true });
          selectQuestion.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
              if(snapshot.key === "name") {
                param.writer = snapshot.val();
              } else {
                param.question = snapshot.val();
              }
            });
            this.storage.set('today_question', param);
            resolve(param);
          });
        } else {
          param.question = val.question;
          param.writer = val.writer;
          resolve(param);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
  
  // 오늘 배경 구하기
  selectTodayBgImg(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('today_bg_img').then((val) => {
        const today_date = moment().format("D"); // 오늘 date
        if(!val || today_date !== val.date) {
          const random: Number = Math.floor(Math.random() * 16) + 1; // 랜덤난수
          let param = {
            bg_num: random,
            date: today_date
          }
          this.storage.set('today_bg_img', param);
          resolve(param);
        } else {
          resolve(val);
        }
      }).catch((error) => {
        console.log("===== 배경 구하기 Error =====");
        reject(error);
      });
    });
  }
}
