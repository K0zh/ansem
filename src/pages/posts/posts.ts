import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
