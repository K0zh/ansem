import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



const DB_NAME: string = 'ansemDB.db';
const win: any = window;

@Injectable()
export class SQLiteProvider {
  private dbPromise: Promise<any>;
  // db: SQLiteObject;

  constructor(
    public platform: Platform,
    public sqlite: SQLite
  ) {

    this.dbPromise = new Promise((resolve, reject) => {
      try {
        let db: any;
        this.platform.ready().then(() => {
          if (this.platform.is('cordova')) {
            db = this.sqlite.create({
              name: DB_NAME,
              location: 'default'
            });
          } else {
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
            db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
          }
          resolve(db);
        });
      } catch(err) {
        reject({err: err});
      }
    });
    this.init();
  }

  init() {
    this.query("create table if not exists POSTS_TB(ID INTEGER PRIMARY KEY AUTOINCREMENT, QUESTION TEXT, CONTENTS TEXT, REG_DT TEXT);", []).catch(err => {
      
    });
  }

  insert(question: String, contents: String, reg_dt: String) {
    this.query("insert or replace into POSTS_TB(ID, QUESTION, CONTENTS, REG_DT) values ((select ID from POSTS_TB where REG_DT = ?),?, ?, ?);", [reg_dt, question, contents, reg_dt]);
  }

  update(contents: String, reg_dt: String) {
    this.query("update POSTS_TB set CONTENTS = ? WHERE REG_DT = ?;",[contents, reg_dt]);
  }

  delete(reg_dt: String) {
    this.query("delete from POSTS_TB WHERE REG_DT = ?;",[reg_dt]);
  }

  select(id: String) {
  }

  selectCheckToday(today: String): Promise<any> {
    return this.query("select * from POSTS_TB where REG_DT = ?;",[today]).then((data) => {
      if(data.length > 0) {
        let result = [];
        for(let i = 0; i < data.length; i++) {
          result.push(data.item(i));
        }
        return result;
      } else {
        return data.length;
      }
    }).catch(e => {
      console.log(e);
    });
  }

  selectAll(): Promise<any> {
    return this.query("select * from POSTS_TB;",[]).then((data) => {
      if(data.length > 0) {
        if (this.platform.is('cordova')) {
          let result = [];
          for(let i = 0; i < data.length; i++) {
            result.push(data.item(i));
          }
          return result;
        } else {
          return data.res.rows;
        }
      }
    }).catch(e => {
      console.log(e);
    });
  }
  
  selectMonth(month): Promise<any> {
    return this.query("select * from POSTS_TB where substr(REG_DT, 1, 7) = ?;", [month]).then((data) => {
      if(data.length > 0) {
        if (this.platform.is('cordova')) {
          let result = [];
          for(let i = 0; i < data.length; i++) {
            result.push(data.item(i));
          }
          return result;
        } else {
          return data.res.rows;
        }
      }
    }).catch(e => {
      console.log(e);
    });
  }

  deleteDB() {
    this.sqlite.deleteDatabase({
      name: 'ansemDB.db',
      location: 'default',
    }).then(()=> console.log("delete DB"))
  }

  query(query: String, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.dbPromise.then(db => {
          db.executeSql(query, params).then((data) => {
            resolve(data.rows);
          }).catch(e => {
            console.log(e);
            reject(e);
          });
        });
      } catch (err) {
        reject({ err: err });
      }
    });
  }
}
