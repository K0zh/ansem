import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { SQLiteProvider } from '../../../providers/sqlite';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-backUp',
  templateUrl: 'backUp.html',
})
export class BackUpPage {
  postsList: any;
  filePath: string;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public sqlite: SQLiteProvider,
    private file: File,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
    ) {
    this.filePath = "file:///storage/emulated/0/Download/";
  }

  ionViewDidLoad() {
  }

  backUp() {
    this.sqlite.selectAll().then(data => {
      this.postsList = data;
      let backUpStr = "";
      for(let i=0; i < this.postsList.length; i++) {
        backUpStr += this.postsList[i].REG_DT + "\t\n" + this.postsList[i].QUESTION + "\t\n" + this.postsList[i].CONTENTS + "\t\n" + "　\n";
      }
      this.file.writeFile(this.filePath, "ansem_bakup.txt",backUpStr,{replace : true});
      let alert = this.alertCtrl.create({
        title: '백업 완료',
        subTitle: "백업 경로 : Download/ansem_backup.txt",
        buttons: ['확인']
      });
      alert.present();

    }).catch(e => {
      console.log(e);
    })
  }

  
  restore() {
    let confirm = this.alertCtrl.create({
      title: "복구하시겠습니까?",
      message: "복구 시 기존 데이터를 덮어씁니다",
      buttons: [
        {
          text: "취소",
          handler: () => {
          }
        },
        {
          text: "확인",
          handler: () => {
            this.file.readAsText(this.filePath, "ansem_bakup.txt").then(data => {
              let restoreStr:Array<any> = data.split('　\n');
              let restoreArr:Array<any> = [];
              restoreStr.pop();
              for(let i=0; i < restoreStr.length; i++) {
                let obj: object = {};
                let restoreData = restoreStr[i].split('\t\n');

                obj["REG_DT"] = restoreData[0];
                obj["QUESTION"] = restoreData[1];
                obj["CONTENTS"] = restoreData[2];
                restoreArr.push(obj);
              }

              for(let i=0; i < restoreArr.length; i++) {
                this.sqlite.insert(restoreArr[i].QUESTION, restoreArr[i].CONTENTS, restoreArr[i].REG_DT);
              }

              let toast = this.toastCtrl.create({
                message: '복구 완료',
                duration: 2000,
                position: 'top'
              });
              toast.present();
  

            }).catch(e => {
              console.log(e);
              let alert = this.alertCtrl.create({
                title: '파일을 찾을 수 없습니다.',
                subTitle: "백업 파일을 'Download' 폴더에 넣어 주세요.",
                buttons: ['확인']
              });
              alert.present();
            })
          }
        }
      ]
    });
    confirm.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
