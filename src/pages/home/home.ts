import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { PostsPage } from '../posts/posts';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  question: FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    public modalCtrl: ModalController,
    firebase_DB: AngularFireDatabase
  ) {
    // console.log(platform.versions());
    this.question = firebase_DB.list('/m_1/d_1/q_1');
    console.log(this.question);
  }

  openPosts() {
    let modal = this.modalCtrl.create(PostsPage);
    modal.present();
  }
}
