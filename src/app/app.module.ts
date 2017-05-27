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
import { AppRatePage } from '../pages/etc/appRate/appRate';
import { BackUpPage } from '../pages/etc/backUp/backUp';
import { ResetPage } from '../pages/etc/reset/reset';

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
    AppRatePage,
    BackUpPage,
    ResetPage
  ],
  imports: [
    CalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    AppRatePage,
    BackUpPage,
    ResetPage
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
    SQLite
  ]
})
export class AppModule {}
