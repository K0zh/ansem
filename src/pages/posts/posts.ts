import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLiteProvider } from '../../providers/sqlite';
import * as moment from 'moment';


@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  postsData: any;
  typeCheck: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform,
    public sqlite: SQLiteProvider,
    private toastCtrl: ToastController
  ) {
    //DB 생성 및 연결
    // this.sqlite.create();
    // this.sqlite.allSelect();

    //Posts 타입 체크 _ write(글작성),view(글 보기만 가능)
    if(this.navParams.get("posts_type") == "write") {
      this.typeCheck = false;
    } else {
      this.typeCheck = true;
    }

    //SQLite DB에 저장할 값
    this.postsData = {
      question: this.navParams.get("question"), //질문
      contents: "", //글 내용
      reg_dt: moment().format('YYYY-MM-DD') //날짜
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  savePosts() {
    this.sqlite.insert(this.postsData.question, this.postsData.contents, this.postsData.reg_dt);
    let toast = this.toastCtrl.create({
      message: '저장 완료',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    this.dismiss();
  }

  selectTest() {
    this.sqlite.select("1");

    this.sqlite.deleteDB();
    console.log(this.postsData);
  }
}
