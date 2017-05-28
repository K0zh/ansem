import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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
    private firebase_DB: AngularFireDatabase
  ) {
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
  
  openPosts() {
    let modal = this.modalCtrl.create(PostsPage);
    modal.present();
  }
}
