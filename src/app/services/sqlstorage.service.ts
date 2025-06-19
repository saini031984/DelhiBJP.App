import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class SqlstorageService {
  readonly db_name: string = "voterlist.db";
    dbInstance: any
  constructor(private platform: Platform,
    private sqlite: SQLite) { }


  databaseConn(tblname: string) {
    debugger
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.db_name,
        location: 'default'
      }).then((sqLite: SQLiteObject) => {
        this.dbInstance = sqLite;
        sqLite.executeSql(`
                  CREATE TABLE IF NOT EXISTS ${tblname} (
                    Id bigint PRIMARY KEY,
                    IDCardNo  ,
                    SlNo  bigint,
                    PartNo bigint,
                    EName   varchar(255),
                    EVName  varchar(255),
                    RName   varchar(255),
                    RVName  varchar(255),
                    RType   varchar(255),
                    Age  int,
                    Gender    varchar(255),
                    sex       varchar(255),
                    HouseNo   varchar(255),
                    ContactNo varchar(255),
                    BlockSectionId bigint  ,
                    LocationId bigint      ,
                    Polling_bothId bigint  ,
                    Sector  varchar(255),  
                    AssemblyId bigint
                  )`, [])
          .then((res: any) => {
            // alert(JSON.stringify(res));
          })
          .catch((error: any) => alert(JSON.stringify(error)));
      })
        .catch((error: any) => alert(JSON.stringify(error)));
    });
  }

  public addItem(entity: voterlistdb) {
    debugger
    this.dbInstance!.executeSql(`
      INSERT INTO tbl_voterlist (Id,IDCardNo,SlNo,PartNo,EName,EVName,RName,RVName,RType,Age,Gender,sex,HouseNo,ContactNo,BlockSectionId,LocationId,Polling_bothId,Sector,AssemblyId) VALUES ('${entity.Id}',
                            '${entity.IDCardNo}')',
                            '${entity.SlNo}')',
                            '${entity.PartNo}')', 
                            '${entity.EName}')',
                            '${entity.EVName}')',
                            '${entity.RName}')',
                            '${entity.RVName}')',
                            '${entity.RType}')',
                            '${entity.Age}')',
                            '${entity.Gender}')',
                            '${entity.sex}')',
                            '${entity.HouseNo}')',
                            '${entity.ContactNo}')',
                            '${entity.BlockSectionId}')''
                            '${entity.LocationId}')',
                            '${entity.Polling_bothId}')',
                            '${entity.Sector}')',
                            '${entity.AssemblyId}')`, [])
      .then(() => {
        alert("Success");
        // this.getAllUsers();
      }, (e: { err: any; }) => {
        alert(JSON.stringify(e.err));
      });
  }
}
export interface voterlistdb {

  Id: number
  , IDCardNo: string
  , SlNo: number
  , PartNo: number
  , EName: string
  , EVName: string
  , RName: string
  , RVName: string
  , RType: string
  , Age: number
  , Gender: string
  , sex: string
  , HouseNo: string
  , ContactNo: string
  , BlockSectionId: number
  , LocationId: number
  , Polling_bothId: number
  , Sector: string
  , AssemblyId: number

}
