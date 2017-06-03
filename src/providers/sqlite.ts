import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class SQLiteProvider {
  
  db: SQLiteObject;

  constructor(
    public platform: Platform,
    public sqlite: SQLite
  ) {
    
  }

  deleteDB() {
    console.log('delete DB')
    this.sqlite.deleteDatabase({
      name: 'postsData.db',
      location: 'default',
    }).then(()=> console.log("delete DB"))
    console.log('delete DB END')
  }

  create() {
    this.platform.ready().then(() => {
      console.log("create DB")

      this.sqlite.create({
        name: 'postsData.db',
        location: 'default'
      }).then((db: SQLiteObject)=> {
        let query = "create table if not exists POSTS_TB(ID INTEGER PRIMARY KEY AUTOINCREMENT, QUESTION TEXT, WRITER TEXT, CONTENTS TEXT, REG_DT DATETIME )";
        db.executeSql(query, {}).then(() => console.log('Executed SQL')).catch(e => console.log(e));
      })

      console.log("create DB END");
    })
  }

  insert(question: String, writer: String, contents: String, reg_dt: Date) {
    console.log("DB insert");
    this.sqlite.create({
      name: 'postsData.db',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      let query = "insert into POSTS_TB(QUESTION, WRITER, CONTENTS, REG_DT) values (?, ?, ?, ?);";
      db.executeSql(query, [question, writer, contents, reg_dt]).then(() => console.log('insert SQL'))
      .catch(e => console.log(e));
    })
  }

  select(id: String) {
    console.log("DB select");
  }

  allSelect(): Promise<any> {
    console.log('allSelect SQL');
    let postsLists = [];

    return this.sqlite.create({
      name: 'postsData.db',
      location: 'default'
    }).then((db: SQLiteObject)=> {
      let query = "select * from POSTS_TB;"
      db.executeSql(query, []).then((data) => {
        console.log(data.rows.length);
        for(var i = 0; i < data.rows.length; i++) {
          postsLists.push(data.rows.item(i));
        }
        console.log(postsLists);
        return postsLists; 
        
      }).catch(e => console.log(e));
    })

  }

}
