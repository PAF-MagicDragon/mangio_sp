import { observable, action, computed } from "mobx";
import { openDatabase } from "react-native-sqlite-storage";
import * as constants from "./constants";
import { Alert } from "react-native";
import uuid from "react-native-uuid";

var db = openDatabase({ name: "ESDatabase.db" });

export class Store {
  @observable var1 = "my store var 1";
  @observable var2 = "my store var 2";
  @observable lists = [];

  @action addList = (value) => {
    this.lists.push(value);
  };

  @observable mainUser = {
    id: null,
    type: null,
    name: null,
    address: null,
    contactNo: null,
    email: null,
    clinicHospital: null,
    specialization: null,
    signature: null,
    licenseNo: null,
    prtNo: null,
    age: null,
    gender: null,
    height: null,
    weight: null,
  };

  @observable updateProfileRequest = {
    name: null,
    address: null,
    contactNo: null,
    email: null,
    clinicHospital: null,
    specialization: null,
    signature: null,
    licenseNo: null,
    prtNo: null,
    age: null,
    gender: null,
    height: null,
    weight: null,
  };

  @action initializeTable = (name, cols) => {
    db.transaction(function (txn) {
      let sql1 =
        "SELECT name FROM sqlite_master WHERE type='table' AND name='" +
        name +
        "'";
      console.log("sql1:", sql1);
      txn.executeSql(sql1, [], function (tx, res) {
        console.log("res1:", res.rows.length);
        if (res.rows.length == 0) {
          let sql2 = "DROP TABLE IF EXISTS " + name + "";
          console.log("sql2:", sql2);
          txn.executeSql(sql2, []);
          let sql3 = "CREATE TABLE IF NOT EXISTS " + name + "(" + cols + ")";
          console.log("sql3:", sql3);
          txn.executeSql(sql3, []);
        }
      });
    });
  };

  @action initializeAllTables = () => {
    // this.initializeTable(
    //   "table_user",
    //   "user_id VARCHAR(50) PRIMARY KEY, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255)"
    // );
    this.initializeTable(
      "ES_USER",
      "ID VARCHAR(50) PRIMARY KEY, TYPE INT(1), NAME VARCHAR(100), ADDRESS VARCHAR(250), CONTACT_NUMBER VARCHAR(50), EMAIL VARCHAR(250), CLINIC_HOSPITAL VARCHAR(250), SPECIALIZATION VARCHAR(100), SIGNATURE BLOB, LICENSE_NO VARCHAR(50), PRT_NO VARCHAR(50), AGE INT(3), GENDER INT(1), HEIGHT DECIMAL(5,2), WEIGHT DECIMAL(5,2)"
    );
  };

  @action mapUserFromDb = (item) => {
    let main = this.mainUser;
    console.log("MAP 1", main, item);
    main.id = item["ID"];
    main.type = item["TYPE"];
    main.name = item["NAME"];
    main.address = item["ADDRESS"];
    console.log("MAP 2", main);
  };

  @action initializeMainUser = (cb) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ES_USER WHERE TYPE = ? or TYPE = ?",
        [constants.TYPE_MAIN_DOCTOR, constants.TYPE_MAIN_PATIENT],
        (tx, results) => {
          console.log("FRANC RESULTS 1", results.rows);
          if (results.rows.length > 0) {
            this.mapUserFromDb(results.rows.item(0));
            // for (let i = 0; i < results.rows.length; ++i) {
            //   let item = results.rows.item(i);
            // }
            cb && cb();
          } else {
            //TODO
          }
        }
      );
    });
  };

  @action updateProfile = (cb) => {
    console.log("FRANC UPDATE PROFILE", this.mainUser);
    let main = this.mainUser;
    if (main.id != null) {
      //TODO update
      console.log("FRANC UPDATE PROFILE 1");
    } else {
      //TODO insert
      console.log("FRANC UPDATE PROFILE 2");
      let temp = this.updateProfileRequest;
      console.log("FRANC UPDATE PROFILE 3");

      db.transaction(function (tx) {
        let id = uuid.v4();
        console.log("FRANC UPDATE PROFILE 4");
        console.log("FRANC VAL 1", id, main, temp.name, temp.address);
        let val = [id, main.type, temp.name, temp.address];
        console.log("FRANC VAL 2", val);
        tx.executeSql(
          "INSERT INTO ES_USER (ID, TYPE, NAME, ADDRESS) VALUES (?,?,?,?)",
          val,
          (tx, results) => {
            console.log("FRANC UPDATE PROFILE 5", results, cb);
            cb != null && cb(results);
          }
        );
      });
    }
  };

  //   @computed get filteredLists() {
  //     const matchCase = new RegExp(this.filter, "i");
  //     return this.lists.filter(
  //       (list) => !this.filter || matchCase.test(list.value)
  //     );
  //   }
}
