import { observable, action, computed } from "mobx";
import { openDatabase } from "react-native-sqlite-storage";
import * as constants from "./constants";
import { Alert } from "react-native";
import uuid from "react-native-uuid";

var db = openDatabase({ name: "ESDatabase.db" });

export class Store {
  @observable updateCounter = 0;

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

  @action initializeTable = (name, cols, cb) => {
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
        cb && cb();
      });
    });
  };

  @action initializeAllTables = (cb) => {
    console.log("ASYNC 1");
    this.initializeTable(
      "ES_USER",
      "ID VARCHAR(50) PRIMARY KEY, TYPE INT(1), NAME VARCHAR(100), ADDRESS VARCHAR(250), CONTACT_NUMBER VARCHAR(50), EMAIL VARCHAR(250), CLINIC_HOSPITAL VARCHAR(250), SPECIALIZATION VARCHAR(100), SIGNATURE BLOB, LICENSE_NO VARCHAR(50), PRT_NO VARCHAR(50), AGE INT(3), GENDER INT(1), HEIGHT DECIMAL(5,2), WEIGHT DECIMAL(5,2)",
      cb
    );
  };

  @action mapUserFromDb = (item) => {
    let main = this.mainUser;
    console.log("MAP 1", main, item);
    main.id = item["ID"];
    main.type = item["TYPE"];
    main.name = item["NAME"];
    main.address = item["ADDRESS"];
    this.updateCounter = this.updateCounter + 1;
    console.log("MAP 2", main, this.updateCounter);
  };

  @action initializeMainUser = (cb) => {
    console.log("ASYNC 2");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ES_USER WHERE TYPE = ? or TYPE = ?",
        [constants.TYPE_MAIN_DOCTOR, constants.TYPE_MAIN_PATIENT],
        (tx, results) => {
          console.log("FRANC RESULTS 1", results.rows);
          if (results.rows.length > 0) {
            this.mapUserFromDb(results.rows.item(0));
          }
          cb && cb();
        }
      );
    });
  };

  @action updateProfile = (cb) => {
    console.log("FRANC UPDATE PROFILE", this.mainUser);
    let main = this.mainUser;
    let temp = this.updateProfileRequest;
    if (main.id != null) {
      //TODO update
      console.log("FRANC UPDATE PROFILE 1");
      db.transaction(function (tx) {
        console.log("FRANC UPDATE PROFILE 1.1");
        let val = [temp.name, temp.address, main.id];
        console.log("FRANC UPDATE PROFILE 1.2", val);
        tx.executeSql(
          "UPDATE ES_USER SET (NAME, ADDRESS) = (?,?) WHERE ID = ? ",
          val,
          (tx, results) => {
            console.log("FRANC UPDATE PROFILE 1.3", results, cb);
            cb != null && cb(results);
          }
        );
      });
    } else {
      //TODO insert
      console.log("FRANC UPDATE PROFILE 2");
      db.transaction(function (tx) {
        let id = uuid.v4();
        console.log("FRANC UPDATE PROFILE 2.1");
        let val = [id, main.type, temp.name, temp.address];
        console.log("FRANC UPDATE PROFILE 2.2", val);
        tx.executeSql(
          "INSERT INTO ES_USER (ID, TYPE, NAME, ADDRESS) VALUES (?,?,?,?)",
          val,
          (tx, results) => {
            console.log("FRANC UPDATE PROFILE 2.3", results, cb);
            cb != null && cb(results);
          }
        );
      });
    }
  };

  @action updateType = (cb) => {
    console.log("FRANC UPDATE TYPE", this.mainUser);
    let main = this.mainUser;
    if (main.id != null) {
      //TODO update
      console.log("FRANC UPDATE TYPE 1");
      db.transaction(function (tx) {
        console.log("FRANC UPDATE TYPE 1.1");
        let val = [main.type, main.id];
        console.log("FRANC UPDATE TYPE 1.2", val);
        tx.executeSql(
          "UPDATE ES_USER SET (TYPE) = (?) WHERE ID = ? ",
          val,
          (tx, results) => {
            console.log("FRANC UPDATE TYPE 1.3", results, cb);
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
