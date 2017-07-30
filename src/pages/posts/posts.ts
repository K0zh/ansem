import { Component, ElementRef, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { SQLiteProvider } from '../../providers/sqlite';
import { LocalStorageProvider } from '../../providers/local-storage';
import { AdProvider } from '../../providers/ad';


@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {
  postsData: any;
  postsType: String;
  typeCheck: boolean;
  refresh: boolean;
  
  bg_url: String;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public elementRef: ElementRef,
    public renderer : Renderer,
    public sqlite: SQLiteProvider,
    public localStorage: LocalStorageProvider,
    private platform: Platform,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private ad: AdProvider
  ) {

    localStorage.selectTodayBgImg().then((data) => {
      this.bg_url = "url(assets/images/bg/bg_img_" + data.bg_num + ".jpg)";
    }).catch((error) => {
      this.bg_url = "url(assets/images/bg/bg_img_1.jpg)";
    });

    //Posts 타입 체크 _ write(글작성),view(글 보기만 가능)
    this.postsType = this.navParams.get("posts_type");

    if(this.postsType == "view") {
      this.typeCheck = true;
    } else {
      this.typeCheck = false;
    }

    //SQLite DB에 저장할 값
    this.postsData = {
      question: this.navParams.get("question"), //질문
      contents: this.navParams.get("contents"), //글 내용
      reg_dt: this.navParams.get("reg_dt") //날짜
    }

    
  }

  ionViewWillLeave() {
    
  }

  dismiss() {
    this.ad.showAdInterstitial();
    this.viewCtrl.dismiss();
  }

  savePosts() {
    this.sqlite.insert(this.postsData.question, this.postsData.contents, this.postsData.reg_dt);
    let toast = this.toastCtrl.create({
      message: '저장 완료',
      duration: 2000,
      position: 'top'
    });
    toast.present();
    this.dismiss();
  }

  update() {
    this.postsType = "update";
    this.typeCheck = false;
  }

  updatePosts() {
    this.sqlite.update(this.postsData.contents, this.postsData.reg_dt);
    let toast = this.toastCtrl.create({
      message: '수정 완료',
      duration: 2000,
      position: 'top'
    });
    toast.present();
    this.postsType = "view";
    this.typeCheck = true;
  }

  deletePosts() {
    let alert = this.alertCtrl.create({
    title: '정말 삭제하시겠습니까?',
    message: '삭제시 복구 할 수 없습니다.',
    buttons: [
      {
        text: '취소',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '확인',
        handler: () => {

          this.sqlite.delete(this.postsData.reg_dt);
          let toast = this.toastCtrl.create({
            message: '삭제 완료',
            duration: 2000,
            position: 'top'
          });
          toast.present();

          const data = { 'deleteCheck' : 'true' };
          this.viewCtrl.dismiss(data);
        }
      }
    ]
  });
  alert.present();
  }
}
