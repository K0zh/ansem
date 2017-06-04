import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLiteProvider } from '../../providers/sqlite';
import { LocalStorageProvider } from '../../providers/local-storage';
import * as moment from 'moment';


@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  postsData: any;
  type_check: boolean;
  bg_url: String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform,
    public sqlite: SQLiteProvider,
    public localStorage: LocalStorageProvider
  ) {
    localStorage.selectTodayBgImg().then((data) => {
      this.bg_url = "url(assets/images/bg/bg_img_" + data.bg_num + ".jpg)";
    }).catch((error) => {
      this.bg_url = "url(assets/images/bg/bg_img_1.jpg)";
    });
    
    //DB 생성 및 연결
    this.sqlite.create();
    this.sqlite.allSelect();

    //Posts 타입 체크 _ write(글작성),view(글 보기만 가능)
    if(this.navParams.get("posts_type") == "write") {
      this.type_check = false;
    } else {
      this.type_check = true;
    }

    //SQLite DB에 저장할 값
    this.postsData = {
      question: this.navParams.get("question"), //질문
      writer: this.navParams.get("writer"), //질문자
      contents: "", //글 내용
      reg_dt: moment().format() //날짜
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  savePosts() {
    this.sqlite.insert(this.postsData.question, this.postsData.writer, this.postsData.contents, this.postsData.reg_dt);
  }

  selectTest() {
    this.sqlite.select("1");
    this.sqlite.allSelect();

    this.sqlite.deleteDB()
    console.log(this.postsData);
  }
}
