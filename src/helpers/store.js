import { observable, action, computed } from "mobx";
import { openDatabase } from "react-native-sqlite-storage";
import * as constants from "./constants";
import { Alert } from "react-native";
import uuid from "react-native-uuid";

var db = openDatabase({ name: "ESDatabase.db" });

export class Store {
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
    gender: constants.GENDER_MALE,
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
    this.initializeTable(
      "ES_USER",
      "ID VARCHAR(50) PRIMARY KEY, TYPE INT(1), NAME VARCHAR(100), ADDRESS VARCHAR(250), CONTACT_NUMBER VARCHAR(50), EMAIL VARCHAR(250), CLINIC_HOSPITAL VARCHAR(250), SPECIALIZATION VARCHAR(100), SIGNATURE BLOB, LICENSE_NO VARCHAR(50), PRT_NO VARCHAR(50), AGE VARCHAR(3), GENDER INT(1), HEIGHT VARCHAR(8), WEIGHT VARCHAR(8)",
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
    main.contactNo = item["CONTACT_NUMBER"];
    main.email = item["EMAIL"];
    main.clinicHospital = item["CLINIC_HOSPITAL"];
    main.specialization = item["SPECIALIZATION"];
    main.signature = item["SIGNATURE"];
    main.licenseNo = item["LICENSE_NO"];
    main.prtNo = item["PRT_NO"];
    main.age = item["AGE"];
    main.gender = item["GENDER"];
    main.height = item["HEIGHT"];
    main.weight = item["WEIGHT"];
  };

  @action mapPatientFromDb = (item) => {
    let patient = {};
    console.log("MAP 1", main, item);
    patient.id = item["ID"];
    // patient.type = item["TYPE"];
    patient.name = item["NAME"];
    patient.address = item["ADDRESS"];
    patient.contactNo = item["CONTACT_NUMBER"];
    patient.email = item["EMAIL"];
    // patient.clinicHospital = item["CLINIC_HOSPITAL"];
    // patient.specialization = item["SPECIALIZATION"];
    // patient.signature = item["SIGNATURE"];
    // patient.licenseNo = item["LICENSE_NO"];
    // patient.prtNo = item["PRT_NO"];
    patient.age = item["AGE"];
    patient.gender = item["GENDER"];
    patient.height = item["HEIGHT"];
    patient.weight = item["WEIGHT"];
    return patient;
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
          }
          cb && cb();
        }
      );
    });
  };

  @action getPatients = (cb) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ES_USER WHERE TYPE = ?",
        [constants.TYPE_SUB_PATIENT],
        (tx, results) => {
          console.log("FRANC PATIENTS 1", results.rows);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(this.mapPatientFromDb(results.rows.item(i)));
          }
          cb && cb(temp);
        }
      );
    });
  };

  @action updateProfile = (request, cb) => {
    console.log("FRANC UPDATE PROFILE", this.mainUser);
    let main = this.mainUser;
    if (main.id != null) {
      //TODO update
      console.log("FRANC UPDATE PROFILE 1");
      db.transaction(function (tx) {
        console.log("FRANC UPDATE PROFILE 1.1");
        let val = [
          request.type,
          request.name,
          request.address,
          request.contactNo,
          request.email,
          request.clinicHospital,
          request.specialization,
          request.signature,
          request.licenseNo,
          request.prtNo,
          request.age,
          request.gender,
          request.height,
          request.weight,
          main.id,
        ];
        console.log("FRANC UPDATE PROFILE 1.2", val);
        tx.executeSql(
          "UPDATE ES_USER SET (TYPE,NAME,ADDRESS,CONTACT_NUMBER,EMAIL,CLINIC_HOSPITAL,SPECIALIZATION,SIGNATURE,LICENSE_NO,PRT_NO,AGE,GENDER,HEIGHT,WEIGHT) = (?,?,?,?,?,?,?,?,?,?,?,?,?,?) WHERE ID = ? ",
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
        let val = [
          id,
          request.type,
          request.name,
          request.address,
          request.contactNo,
          request.email,
          request.clinicHospital,
          request.specialization,
          request.signature,
          request.licenseNo,
          request.prtNo,
          request.age,
          request.gender,
          request.height,
          request.weight,
        ];
        console.log("FRANC UPDATE PROFILE 2.2", val);
        tx.executeSql(
          "INSERT INTO ES_USER (ID,TYPE,NAME,ADDRESS,CONTACT_NUMBER,EMAIL,CLINIC_HOSPITAL,SPECIALIZATION,SIGNATURE,LICENSE_NO,PRT_NO,AGE,GENDER,HEIGHT,WEIGHT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          val,
          (tx, results) => {
            console.log("FRANC UPDATE PROFILE 2.3", results, cb);
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
