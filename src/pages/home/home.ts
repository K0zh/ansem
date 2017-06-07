import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { PostsPage } from '../posts/posts';

import { SQLiteProvider } from '../../providers/sqlite';
import * as moment from 'moment';



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
    private firebase_DB: AngularFireDatabase,
    public sqlite: SQLiteProvider
  ) {
    this.today = moment().format('YYYY-MM-DD');

    const today_question = this.firebase_DB.list('/m_1/d_1/q_1', { preserveSnapshot: true });
    today_question.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        if(snapshot.key === "name") {
          this.writer = snapshot.val();
        } else {
          this.question = snapshot.val();
        }
      });
    });
  }

  ionViewDidLoad() {
    
  }

  test() {
    this.sqlite.deleteDB();
  }
  
  openPosts() {
    console.log(this.today);

    this.sqlite.selectCheckToday(this.today).then(data => {
      console.log(data.length);
      console.log("selecCheckTest")
    }).catch(e => {
      console.log(e);
    });
    let modal = this.modalCtrl.create(PostsPage, {"question": this.question, "writer": this.writer, "posts_type": "write"});
    modal.present();
  }
}
