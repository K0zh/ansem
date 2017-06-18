import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Firebase } from '@ionic-native/firebase';
import { AppVersion } from '@ionic-native/app-version';
import { AppRate } from '@ionic-native/app-rate';
import { AdMob } from '@ionic-native/admob';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';

import { CalendarModule } from "ion2-calendar";

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EtcPage } from '../pages/etc/etc';
import { PostsPage } from '../pages/posts/posts';
import { NotificationPage } from '../pages/etc/notification/notification';
import { BgmPage } from '../pages/etc/bgm/bgm';
import { QuestionPage } from '../pages/etc/question/question';
import { AppInfoPage } from '../pages/etc/appInfo/appInfo';
import { BackUpPage } from '../pages/etc/backUp/backUp';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SQLiteProvider } from '../providers/sqlite';
import { LocalStorageProvider } from '../providers/local-storage';


//Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAs2SpcOseb_tWhsGnPATprz9AeCQtFJuw",
  authDomain: "ansem-63999.firebaseapp.com",
  databaseURL: "https://ansem-63999.firebaseio.com",
  projectId: "ansem-63999",
  storageBucket: "ansem-63999.appspot.com",
  messagingSenderId: "414194822125"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    ListPage,
    EtcPage,
    PostsPage,
    NotificationPage,
    BgmPage,
    QuestionPage,
    AppInfoPage,
    BackUpPage
  ],
  imports: [
    CalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot({
      name: 'ansemDB',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    ListPage,
    EtcPage,
    PostsPage,
    NotificationPage,
    BgmPage,
    QuestionPage,
    AppInfoPage,
    BackUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    Firebase,
    AppVersion,
    AppRate,
    AdMob,
    EmailComposer,
    File,
    SQLite,
    SQLiteProvider,
    LocalStorageProvider
  ]
})
export class AppModule {}
