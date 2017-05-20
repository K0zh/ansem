import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { PostsPage } from '../posts/posts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    public modalCtrl: ModalController
  ) {
    console.log(platform.versions());
  }

  openPosts() {
    let modal = this.modalCtrl.create(PostsPage);
    modal.present();
  }
}
