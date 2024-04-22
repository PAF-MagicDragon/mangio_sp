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
    db.transaction(function (tx) {
      let sql1 =
        "SELECT name FROM sqlite_master WHERE type='table' AND name='" +
        name +
        "'";
      tx.executeSql(sql1, [], function (tx, res) {
        if (res.rows.length == 0) {
          let sql2 = "DROP TABLE IF EXISTS " + name + "";
          tx.executeSql(sql2, []);
          let sql3 = "CREATE TABLE IF NOT EXISTS " + name + "(" + cols + ")";
          tx.executeSql(sql3, []);
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
    this.initializeTable(
      "ES_PRESCRIPTION",
      "ID VARCHAR(50) PRIMARY KEY, CREATE_DATE INT(15), DIAGNOSIS VARCHAR(250), DOCTOR_ID VARCHAR(50), PATIENT_ID VARCHAR(50)"
    );
    this.initializeTable(
      "ES_TEMPLATE",
      "ID VARCHAR(50) PRIMARY KEY, BRAND VARCHAR(100), GENERIC VARCHAR(100), FORMULATION VARCHAR(100), IS_DEFAULT INT(1)"
    );
    this.initializeDefaultData(
      "ES_TEMPLATE",
      "ID, BRAND, GENERIC, FORMULATION, IS_DEFAULT",
      constants.templates
    );
  };

  @action initializeDefaultData = (name, cols, data, cb) => {
    db.transaction(function (tx) {
      let sql1 = "SELECT * FROM " + name + " WHERE IS_DEFAULT = ?";
      tx.executeSql(sql1, [1], function (tx, res) {
        let count = res.rows.length;
        console.log("SELECT TEMPLATE COUNT", count, res, data.length);
        if (count == 0 || count != data.length) {
          let sql2 = "DELETE FROM " + name + " WHERE IS_DEFAULT = ?";
          tx.executeSql(sql2, [1]);
          let sql3 = "INSERT INTO " + name + " (" + cols + ") VALUES ";
          let append = "";
          let val = [];
          data.forEach((dataInner) => {
            if (append.length > 0) {
              append = append + ",";
            }
            append = append + "(";
            let appendInner = "";
            dataInner.forEach((t) => {
              if (appendInner.length > 0) {
                appendInner = appendInner + ",";
              }
              appendInner = appendInner + "?";
              val.push(t);
            });
            append = append + appendInner;
            append = append + ")";
          });
          sql3 = sql3 + append + ";";
          tx.executeSql(sql3, val);
        } else {
          console.log("NO INSERT TEMPLATE");
        }
        cb && cb();
      });
    });
  };

  @action mapUserFromDb = (item) => {
    let main = this.mainUser;
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

  @action mapPrescriptionFromDb = (item) => {
    let prescription = {};
    prescription.id = item["ID"];
    prescription.createDate = item["CREATE_DATE"];
    prescription.diagnosis = item["DIAGNOSIS"];
    prescription.doctorId = item["DOCTOR_ID"];
    prescription.patientId = item["PATIENT_ID"];
    return prescription;
  };

  @action initializeMainUser = (cb) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ES_USER WHERE TYPE = ? or TYPE = ?",
        [constants.TYPE_MAIN_DOCTOR, constants.TYPE_MAIN_PATIENT],
        (tx, results) => {
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
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(this.mapPatientFromDb(results.rows.item(i)));
          }
          cb && cb(temp);
        }
      );
    });
  };

  @action getPrescriptions = (doctorId, patientId, cb) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ES_PRESCRIPTION WHERE DOCTOR_ID = ? AND PATIENT_ID = ?",
        [doctorId, patientId],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(this.mapPrescriptionFromDb(results.rows.item(i)));
          }
          cb && cb(temp);
        }
      );
    });
  };

  @action addEditEsUser = (request, cb) => {
    if (request.id != null) {
      db.transaction(function (tx) {
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
          request.id,
        ];
        tx.executeSql(
          "UPDATE ES_USER SET (TYPE,NAME,ADDRESS,CONTACT_NUMBER,EMAIL,CLINIC_HOSPITAL,SPECIALIZATION,SIGNATURE,LICENSE_NO,PRT_NO,AGE,GENDER,HEIGHT,WEIGHT) = (?,?,?,?,?,?,?,?,?,?,?,?,?,?) WHERE ID = ? ",
          val,
          (tx, results) => {
            cb != null && cb(results);
          }
        );
      });
    } else {
      db.transaction(function (tx) {
        let id = uuid.v4();
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
        tx.executeSql(
          "INSERT INTO ES_USER (ID,TYPE,NAME,ADDRESS,CONTACT_NUMBER,EMAIL,CLINIC_HOSPITAL,SPECIALIZATION,SIGNATURE,LICENSE_NO,PRT_NO,AGE,GENDER,HEIGHT,WEIGHT) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          val,
          (tx, results) => {
            cb != null && cb(results);
          }
        );
      });
    }
  };

  @action addEditEsPrescription = (request, cb) => {
    if (request.id != null) {
      db.transaction(function (tx) {
        let val = [request.diagnosis, request.id];
        tx.executeSql(
          "UPDATE ES_PRESCRIPTION SET (PRESCRIPTION) = (?) WHERE ID = ? ",
          val,
          (tx, results) => {
            cb != null && cb(results);
          }
        );
      });
    } else {
      db.transaction(function (tx) {
        let id = uuid.v4();
        let dateNow = new Date().getTime();
        let val = [
          id,
          dateNow,
          request.diagnosis,
          request.doctorId,
          request.patientId,
        ];
        tx.executeSql(
          "INSERT INTO ES_PRESCRIPTION (ID,CREATE_DATE,DIAGNOSIS,DOCTOR_ID,PATIENT_ID) VALUES (?,?,?,?,?)",
          val,
          (tx, results) => {
            cb != null && cb(results);
          }
        );
      });
    }
  };

  @action deleteRecord = (table, id, cb) => {
    db.transaction(function (tx) {
      let val = [id];
      tx.executeSql(
        "DELETE FROM " + table + " WHERE ID = ? ",
        val,
        (tx, results) => {
          cb != null && cb(results);
        }
      );
    });
  };

  @action deletePatient = (id, cb) => {
    this.deleteRecord("ES_USER", id, cb);
  };

  @action deletePrescription = (id, cb) => {
    this.deleteRecord("ES_PRESCRIPTION", id, cb);
  };

  //   @computed get filteredLists() {
  //     const matchCase = new RegExp(this.filter, "i");
  //     return this.lists.filter(
  //       (list) => !this.filter || matchCase.test(list.value)
  //     );
  //   }
}
