import { observable, action, computed } from "mobx";
import { openDatabase } from "react-native-sqlite-storage";
import * as constants from "./constants";
import { Alert, Platform } from "react-native";
import uuid from "react-native-uuid";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import PushNotification from "react-native-push-notification";
import RNFetchBlob from "rn-fetch-blob";

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
    ptrNo: null,
    bday: null,
    gender: constants.GENDER_MALE,
  };

  @observable tempDrugList = [];

  @observable qrString = null;

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
          console.log("FRANC CREATE/DROP", sql2, sql3);
        }
        cb && cb();
      });
    });
  };

  @action initializeAllTables = (cb) => {
    this.initializeTable(
      "ES_USER",
      "ID VARCHAR(50) PRIMARY KEY, TYPE INT(1), NAME VARCHAR(100), ADDRESS VARCHAR(250), CONTACT_NUMBER VARCHAR(50), EMAIL VARCHAR(250), CLINIC_HOSPITAL VARCHAR(250), SPECIALIZATION VARCHAR(100), SIGNATURE BLOB, LICENSE_NO VARCHAR(50), PTR_NO VARCHAR(50), BDAY INT(15), GENDER INT(1)",
      cb
    );
    this.initializeTable(
      "ES_PRESCRIPTION",
      "ID VARCHAR(50) PRIMARY KEY, CREATE_DATE INT(15), DIAGNOSIS VARCHAR(250), DOCTOR_ID VARCHAR(50), PATIENT_ID VARCHAR(50), HEIGHT VARCHAR(8), WEIGHT VARCHAR(8)"
    );
    this.initializeTable(
      "ES_TEMPLATE",
      "ID VARCHAR(50) PRIMARY KEY, BRAND VARCHAR(100), GENERIC VARCHAR(100), FORMULATION VARCHAR(100), IS_DEFAULT INT(1)"
    );
    this.initializeTable(
      "ES_DRUG",
      "ID VARCHAR(50) PRIMARY KEY, PRESCRIPTION_ID VARCHAR(50), NAME VARCHAR(250), STRENGTH VARCHAR(50), PREPARATION INT(2), ROUTE INT(2), DIRECTION INT(2), FREQUENCY INT(2), DURATION VARCHAR(50), TYPE INT(2), INSTRUCTIONS VARCHAR(200), TOTAL INT(3), REFILLS INT(3)"
    );
    this.initializeTable(
      "ES_SCHEDULE",
      "ID VARCHAR(50) PRIMARY KEY, INTAKE_DATE INT(15), PRESCRIPTION_ID VARCHAR(50), DRUG_ID VARCHAR(50), PATIENT_ID VARCHAR(50), STATUS INT(1)"
    );
    this.initializeDefaultData(
      "ES_TEMPLATE",
      "ID, BRAND, GENERIC, FORMULATION, IS_DEFAULT",
      constants.TEMPLATES
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
          console.log("DELETE TEMPLATE", sql2);
          tx.executeSql(sql2, [1]);
          if (data.length > 0) {
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
            console.log("INSERT TEMPLATE", sql3, val);
            tx.executeSql(sql3, val);
          }
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
    main.ptrNo = item["PTR_NO"];
    main.bday = item["BDAY"];
    main.gender = item["GENDER"];
    console.log("FRANC MAIN USER", main, item);
  };

  @action mapPatientFromDb = (item) => {
    let patient = {};
    patient.id = item["ID"];
    patient.type = item["TYPE"];
    patient.name = item["NAME"];
    patient.address = item["ADDRESS"];
    patient.contactNo = item["CONTACT_NUMBER"];
    patient.email = item["EMAIL"];
    // patient.clinicHospital = item["CLINIC_HOSPITAL"];
    // patient.specialization = item["SPECIALIZATION"];
    // patient.signature = item["SIGNATURE"];
    // patient.licenseNo = item["LICENSE_NO"];
    // patient.ptrNo = item["PTR_NO"];
    patient.bday = item["BDAY"];
    patient.gender = item["GENDER"];
    return patient;
  };

  @action mapPrescriptionFromDb = (item, showDoctor) => {
    console.log("FRANC ITEM", item);
    let prescription = {};
    prescription.id = item["ID"];
    prescription.createDate = item["CREATE_DATE"];
    prescription.diagnosis = item["DIAGNOSIS"];
    prescription.doctorId = item["DOCTOR_ID"];
    prescription.patientId = item["PATIENT_ID"];
    prescription.height = item["HEIGHT"];
    prescription.weight = item["WEIGHT"];
    if (showDoctor) {
      prescription.doctorName = item["NAME"];
    }
    return prescription;
  };

  @action mapDrugFromDb = (item) => {
    let drug = {};
    drug.id = item["ID"];
    drug.prescriptionId = item["PRESCRIPTION_ID"];
    drug.name = item["NAME"];
    drug.strength = item["STRENGTH"];
    drug.preparation = item["PREPARATION"];
    drug.route = item["ROUTE"];
    drug.direction = item["DIRECTION"];
    drug.frequency = item["FREQUENCY"];
    drug.duration = item["DURATION"];
    drug.type = item["TYPE"];
    drug.instructions = item["INSTRUCTIONS"];
    let tempTotal = item["TOTAL"];
    drug.total = tempTotal != null ? tempTotal.toString() : null;
    drug.refills = item["REFILLS"];
    return drug;
  };

  @action mapScheduleFromDb = (item) => {
    let schedule = {};
    schedule.id = item["ID"];
    schedule.intakeDate = item["INTAKE_DATE"];
    schedule.prescriptionId = item["PRESCRIPTION_ID"];
    schedule.drugId = item["DRUG_ID"];
    schedule.patientId = item["PATIENT_ID"];
    schedule.status = item["STATUS"];
    schedule.drugName = item["DRUG_NAME"];
    schedule.drugPreparation = item["DRUG_PREPARATION"];
    schedule.drugRoute = item["DRUG_ROUTE"];
    schedule.drugDirection = item["DRUG_DIRECTION"];
    schedule.drugInstructions = item["DRUG_INSTRUCTIONS"];
    let tempTotal = item["DRUG_TOTAL"];
    schedule.total = tempTotal != null ? tempTotal.toString() : null;
    return schedule;
  };

  @action mapTemplateFromDb = (item) => {
    let template = {};
    template.id = item["ID"];
    template.brand = item["BRAND"];
    template.generic = item["GENERIC"];
    template.formulation = item["FORMULATION"];
    template.isDefault = item["IS_DEFAULT"];
    return template;
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
        "SELECT * FROM ES_USER WHERE TYPE = ? ORDER BY NAME COLLATE NOCASE",
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

  @action getPrescriptions = (doctorId, patientId, showDoctor, cb) => {
    db.transaction((tx) => {
      let sql =
        "SELECT p.*, u.name FROM ES_PRESCRIPTION p, ES_USER u WHERE p.DOCTOR_ID = u.id AND p.PATIENT_ID = ? ORDER BY p.CREATE_DATE DESC";
      let val = [patientId];
      if (doctorId != null) {
        sql =
          "SELECT p.*, u.name FROM ES_PRESCRIPTION p, ES_USER u WHERE p.DOCTOR_ID = u.id AND p.DOCTOR_ID = ? AND p.PATIENT_ID = ? ORDER BY p.CREATE_DATE DESC";
        val = [doctorId, patientId];
      }
      tx.executeSql(sql, val, (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(
            this.mapPrescriptionFromDb(results.rows.item(i), showDoctor)
          );
        }
        cb && cb(temp);
      });
    });
  };

  @action getDrugs = (prescriptionId, cb) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ES_DRUG WHERE PRESCRIPTION_ID = ? ORDER BY NAME COLLATE NOCASE",
        [prescriptionId],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(this.mapDrugFromDb(results.rows.item(i)));
          }
          cb && cb(temp);
        }
      );
    });
  };

  @action getTemplates = (isDefault, cb) => {
    db.transaction((tx) => {
      let sql =
        "SELECT * FROM ES_TEMPLATE ORDER BY BRAND COLLATE NOCASE, GENERIC COLLATE NOCASE";
      let val = [];
      if (isDefault != null) {
        sql =
          "SELECT * FROM ES_TEMPLATE WHERE IS_DEFAULT = ? ORDER BY BRAND COLLATE NOCASE, GENERIC COLLATE NOCASE";
        val = [isDefault];
      }
      tx.executeSql(sql, val, (tx, results) => {
        console.log("TEMPLATE RESULTS");
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(this.mapTemplateFromDb(results.rows.item(i)));
        }
        cb && cb(temp);
      });
    });
  };

  @action getSchedules = (patientId, status, cb) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT s.*, d.name AS DRUG_NAME, d.preparation AS DRUG_PREPARATION, d.route AS DRUG_ROUTE, d.direction AS DRUG_DIRECTION, d.instructions as DRUG_INSTRUCTIONS, d.total as DRUG_TOTAL FROM ES_SCHEDULE s, ES_DRUG d WHERE s.DRUG_ID = d.id AND s.PATIENT_ID = ? AND s.STATUS = ? ORDER BY s.INTAKE_DATE",
        [patientId, status],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(this.mapScheduleFromDb(results.rows.item(i)));
          }
          cb && cb(temp);
        }
      );
    });
  };

  @action deleteScheduledPushNotif = (prescriptionId, cb) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT ID FROM ES_SCHEDULE WHERE PRESCRIPTION_ID = ?",
        [prescriptionId],
        (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            let id = results.rows.item(i)["ID"];
            let notifId = this.convertToNotifId(id);
            PushNotification.cancelLocalNotification(notifId);
          }
          cb && cb(temp);
        }
      );
    });
  };

  @action convertToNotifId(str) {
    let hash = 0;
    let i = 0;
    const len = str.length;
    while (i < len) {
      hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
    }
    return hash;
  }

  @action addEditEsUser = (request, cb) => {
    console.log("ES USER", request);
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
          request.ptrNo,
          request.bday,
          request.gender,
          request.id,
        ];
        tx.executeSql(
          "UPDATE ES_USER SET (TYPE,NAME,ADDRESS,CONTACT_NUMBER,EMAIL,CLINIC_HOSPITAL,SPECIALIZATION,SIGNATURE,LICENSE_NO,PTR_NO,BDAY,GENDER) = (?,?,?,?,?,?,?,?,?,?,?,?) WHERE ID = ? ",
          val,
          (tx, results) => {
            cb && cb(results);
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
          request.ptrNo,
          request.bday,
          request.gender,
        ];
        tx.executeSql(
          "INSERT INTO ES_USER (ID,TYPE,NAME,ADDRESS,CONTACT_NUMBER,EMAIL,CLINIC_HOSPITAL,SPECIALIZATION,SIGNATURE,LICENSE_NO,PTR_NO,BDAY,GENDER) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          val,
          (tx, results) => {
            cb && cb(results);
          }
        );
      });
    }
  };

  @action addEditEsPrescription = (request, cb, cb2) => {
    if (request.id != null) {
      db.transaction(function (tx) {
        let val = [
          request.createDate,
          request.diagnosis,
          request.height,
          request.weight,
          request.id,
        ];
        tx.executeSql(
          "UPDATE ES_PRESCRIPTION SET (CREATE_DATE,DIAGNOSIS,HEIGHT,WEIGHT) = (?,?,?,?) WHERE ID = ? ",
          val,
          (tx, results) => {
            tx.executeSql(
              "DELETE FROM ES_DRUG WHERE PRESCRIPTION_ID = ?",
              [request.id],
              (tx, results) => {
                request.drugList.forEach((drug, i) => {
                  let innerId = uuid.v4();
                  let innerVal = [
                    innerId,
                    request.id,
                    drug.name,
                    drug.strength,
                    drug.preparation,
                    drug.route,
                    drug.direction,
                    drug.frequency,
                    drug.duration,
                    drug.type,
                    drug.instructions,
                    drug.total,
                    drug.refills,
                  ];
                  tx.executeSql(
                    "INSERT INTO ES_DRUG (ID,PRESCRIPTION_ID,NAME,STRENGTH,PREPARATION,ROUTE,DIRECTION,FREQUENCY,DURATION,TYPE,INSTRUCTIONS,TOTAL,REFILLS) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    innerVal,
                    (tx, results) => {
                      cb2 && cb2(innerId, id, drug);
                    }
                  );
                });
              }
            );
            cb && cb(results);
          }
        );
      });
    } else {
      db.transaction(function (tx) {
        let id = uuid.v4();
        let val = [
          id,
          request.createDate,
          request.diagnosis,
          request.doctorId,
          request.patientId,
          request.height,
          request.weight,
        ];
        tx.executeSql(
          "INSERT INTO ES_PRESCRIPTION (ID,CREATE_DATE,DIAGNOSIS,DOCTOR_ID,PATIENT_ID,HEIGHT,WEIGHT) VALUES (?,?,?,?,?,?,?)",
          val,
          (tx, results) => {
            let size = request.drugList.length;
            request.drugList.forEach((drug, i) => {
              let innerId = uuid.v4();
              let innerVal = [
                innerId,
                id,
                drug.name,
                drug.strength,
                drug.preparation,
                drug.route,
                drug.direction,
                drug.frequency,
                drug.duration,
                drug.type,
                drug.instructions,
                drug.total,
                drug.refills,
              ];
              tx.executeSql(
                "INSERT INTO ES_DRUG (ID,PRESCRIPTION_ID,NAME,STRENGTH,PREPARATION,ROUTE,DIRECTION,FREQUENCY,DURATION,TYPE,INSTRUCTIONS,TOTAL,REFILLS) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                innerVal,
                (tx, results) => {
                  cb2 && cb2(innerId, id, drug);
                }
              );
            });
            cb && cb(results);
          }
        );
      });
    }
  };

  @action addEditEsTemplate = (request, cb) => {
    console.log("ES TEMPLATE", request);
    if (request.id != null) {
      db.transaction(function (tx) {
        let val = [
          request.brand,
          request.generic,
          request.formulation,
          request.isDefault,
          request.id,
        ];
        tx.executeSql(
          "UPDATE ES_TEMPLATE SET (BRAND,GENERIC,FORMULATION,IS_DEFAULT) = (?,?,?,?) WHERE ID = ? ",
          val,
          (tx, results) => {
            cb && cb(results);
          }
        );
      });
    } else {
      db.transaction(function (tx) {
        let id = uuid.v4();
        let val = [
          id,
          request.brand,
          request.generic,
          request.formulation,
          request.isDefault,
        ];
        tx.executeSql(
          "INSERT INTO ES_TEMPLATE (ID,BRAND,GENERIC,FORMULATION,IS_DEFAULT) VALUES (?,?,?,?,?)",
          val,
          (tx, results) => {
            cb && cb(results);
          }
        );
      });
    }
  };

  @action deleteRecord = (table, id, whereField, cb) => {
    console.log("FRANC DEL RECORD", table);
    db.transaction(function (tx) {
      let val = [id];
      let sql = "DELETE FROM " + table + " WHERE " + whereField + "";
      console.log("DELETE RECORD SQL:", sql);
      tx.executeSql(sql, val, (tx, results) => {
        cb && cb(results);
      });
    });
  };

  @action deletePatient = (id, cb) => {
    this.deleteRecord(
      "ES_DRUG",
      id,
      "PRESCRIPTION_ID IN (SELECT ID FROM ES_PRESCRIPTION WHERE PATIENT_ID = ?)",
      null
    );
    this.deleteRecord("ES_PRESCRIPTION", id, "PATIENT_ID = ?", null);
    this.deleteRecord("ES_USER", id, "ID = ?", cb);
  };

  @action deletePrescription = (id, withScheduleDelete, cb) => {
    if (withScheduleDelete) {
      this.deleteScheduledPushNotif(id, () => {
        this.deleteRecord("ES_SCHEDULE", id, "PRESCRIPTION_ID = ?", null);
      });
    }
    this.deleteRecord("ES_DRUG", id, "PRESCRIPTION_ID = ?", null);
    this.deleteRecord("ES_PRESCRIPTION", id, "ID = ?", cb);
  };

  @action deleteTemplate = (id, cb) => {
    this.deleteRecord("ES_TEMPLATE", id, "ID = ?", cb);
  };

  //   @computed get filteredLists() {
  //     const matchCase = new RegExp(this.filter, "i");
  //     return this.lists.filter(
  //       (list) => !this.filter || matchCase.test(list.value)
  //     );
  //   }

  @action initializeTemplateData = (cb) => {
    this.getTemplates(null, (list) => {
      let temp = [];
      list.forEach((x, i) => {
        let s = x.brand;
        if (x.generic != null) {
          s = s + " (" + x.generic + ") ";
        }
        if (x.formulation != null) {
          s = s + " - " + x.formulation;
        }
        temp.push({ label: s, value: s });
      });
      cb && cb(temp);
    });
  };

  @action formDropDownData = (list, withSort) => {
    let temp = [];
    list.forEach((data) => {
      temp.push({ label: data.label, value: data.value });
    });
    if (withSort) {
      temp.sort((a, b) => {
        let fa = a.label.toLowerCase();
        let fb = b.label.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    }
    return temp;
  };

  @action getLabelFromValue(value, list) {
    let found = list.find((i) => i.value == value);
    return found != null ? found.label : "";
  }

  @action confirm(cb, header, subHeader) {
    Alert.alert(header, subHeader, [
      {
        text: "Yes",
        onPress: () => {
          cb && cb();
        },
      },
      {
        text: "No",
      },
    ]);
  }

  @action convertDateIntToString(dateInt) {
    const value = dateInt != null ? new Date(dateInt) : null;
    return value != null ? value.toLocaleDateString() : "";
  }

  @action convertDateIntToStringWithTime(dateInt) {
    const value = dateInt != null ? new Date(dateInt) : null;
    return value != null
      ? value.toLocaleDateString() + " " + value.toLocaleTimeString()
      : "";
  }

  @action addValToQrString(s, val) {
    let string = s;
    string = string.concat("|");
    if (val != null) {
      string = string.concat(val);
    }
    return string;
  }

  @action createQrString(doctorData, prescriptionData, patientData, drugList) {
    console.log(
      "FRANC CREATE QR",
      doctorData,
      prescriptionData,
      patientData,
      drugList
    );

    let string1 = "";
    string1 = this.addValToQrString(string1, doctorData.id);
    string1 = this.addValToQrString(string1, doctorData.name);

    console.log("FRANC STRING 1", string1);

    let string2 = "";
    string2 = this.addValToQrString(string2, prescriptionData.createDate);
    string2 = this.addValToQrString(string2, prescriptionData.diagnosis);
    string2 = this.addValToQrString(string2, prescriptionData.height);
    string2 = this.addValToQrString(string2, prescriptionData.weight);

    console.log("FRANC STRING 2", string2);
    let string3 = "";
    string3 = this.addValToQrString(string3, patientData.name);

    console.log("FRANC STRING 3", string3);
    let list1 = [];
    drugList.forEach((drug, i) => {
      let inner = "";
      inner = this.addValToQrString(inner, drug.name);
      inner = this.addValToQrString(inner, drug.strength);
      inner = this.addValToQrString(inner, drug.preparation);
      inner = this.addValToQrString(inner, drug.route);
      inner = this.addValToQrString(inner, drug.direction);
      inner = this.addValToQrString(inner, drug.frequency);
      inner = this.addValToQrString(inner, drug.duration);
      inner = this.addValToQrString(inner, drug.type);
      inner = this.addValToQrString(inner, drug.instructions);
      inner = this.addValToQrString(inner, drug.total);
      console.log("FRANC STRING INNER", inner);
      list1.push(inner);
    });

    console.log("FRANC STRING 4", list1);

    let obj = {
      a: string1,
      b: string2,
      c: string3,
      d: list1,
    };

    let s = JSON.stringify(obj);
    console.log("FRANC CREATE QR S", s);
    return s;
  }

  @action getAgeFromBday(bday) {
    return Math.floor((new Date() - new Date(bday)) / 31557600000);
  }

  @action createHtmlString(
    doctorData,
    prescriptionData,
    patientData,
    drugList,
    qrImage
  ) {
    let pdfString = constants.HTML_TEMPLATE;
    let drugString = constants.DRUG_TEMPLATE;
    let imgString = constants.IMG_TEMPLATE;
    pdfString = pdfString.replace(
      "[clinicHospital]",
      doctorData.clinicHospital
    );
    pdfString = pdfString.replace("[doctorAddress]", doctorData.address);
    pdfString = pdfString.replace("[doctorContactNo]", doctorData.contactNo);
    pdfString = pdfString.replace("[doctorEmail]", doctorData.email);
    pdfString = pdfString.replace("[doctorName]", doctorData.name);
    let signatureString =
      doctorData.signature != null
        ? imgString.replace("[encryptedString]", doctorData.signature)
        : "";
    pdfString = pdfString.replace("[doctorSignature]", signatureString);

    pdfString = pdfString.replace("[doctorLicenseNo]", doctorData.licenseNo);
    pdfString = pdfString.replace("[doctorPtrNo]", doctorData.ptrNo);
    pdfString = pdfString.replace("[patientName]", patientData.name);
    pdfString = pdfString.replace("[patientAddress]", patientData.address);
    pdfString = pdfString.replace("[patientHeight]", prescriptionData.height);
    pdfString = pdfString.replace("[patientWeight]", prescriptionData.weight);
    let age = this.getAgeFromBday(patientData.bday);
    pdfString = pdfString.replace("[patientAge]", age);
    pdfString = pdfString.replace(
      "[prescriptionDate]",
      this.convertDateIntToStringWithTime(prescriptionData.createDate)
    );
    let drugContent = "";
    drugList.forEach((drug, i) => {
      let innerString = drugString;
      let drugDetails = "";
      drugDetails = drugDetails.concat(drug.name);
      drugDetails = drugDetails.concat(" ").concat(drug.strength);
      drugDetails = drugDetails
        .concat(" ")
        .concat(
          this.getLabelFromValue(drug.preparation, constants.LIST_PREPARATION)
        );
      innerString = innerString.replace("[drugDetails]", drugDetails);
      let drugDetails2 = "";
      drugDetails2 = drugDetails2
        .concat(" ")
        .concat(this.getLabelFromValue(drug.route, constants.LIST_ROUTE));
      drugDetails2 = drugDetails2
        .concat(" ")
        .concat(
          this.getLabelFromValue(drug.direction, constants.LIST_DIRECTION)
        );
      drugDetails2 = drugDetails2.concat(" ").concat(drug.duration);
      drugDetails2 = drugDetails2
        .concat(" ")
        .concat(this.getLabelFromValue(drug.type, constants.LIST_TYPE));
      drugDetails2 = drugDetails2
        .concat(" ")
        .concat(
          this.getLabelFromValue(drug.frequency, constants.LIST_FREQUENCY)
        );
      if (drug.total != null) {
        drugDetails2 = drugDetails2.concat(" Total: ").concat(drug.total);
      }
      innerString = innerString.replace("[drugDetails2]", drugDetails2);
      innerString = innerString.replace(
        "[drugInstructions]",
        drug.instructions
      );
      drugContent = drugContent.concat(innerString);
    });
    pdfString = pdfString.replace("[drugContent]", drugContent);

    let qrString = imgString.replace("[encryptedString]", qrImage);
    pdfString = pdfString.replace("[qrContent]", qrString);
    return pdfString;
  }

  @action createPDF = async (string) => {
    let myHtml = string;
    let fileName = "Expresscript_PDF_" + new Date().getTime();
    try {
      let PDFOptions = {
        html: myHtml,
        fileName: fileName,
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
        base64: true,
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      // if (!file.filePath) return;
      // alert("File saved to: " + file.filePath);
      let filePath = RNFetchBlob.fs.dirs.DownloadDir + "/" + fileName + ".pdf";
      RNFetchBlob.fs
        .writeFile(filePath, file.base64, "base64")
        .then((response) => {
          console.log("Success Log:", response);
          alert("File saved to: " + filePath);
        })
        .catch((errors) => {
          console.log("Error Log:", errors);
        });
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  @action saveValuesFromQr(qrString, patientId, cb) {
    try {
      let qrObj = JSON.parse(qrString);

      let string1 = qrObj.a; //doctor
      let string2 = qrObj.b; //prescription
      let string3 = qrObj.c; //patient
      let list1 = qrObj.d; //drug list

      let arr1 = string1.split("|");
      let doctorData = {};
      doctorData.id = "SUB-" + arr1[1];
      doctorData.name = arr1[2];

      let arr2 = string2.split("|");
      let prescriptionData = {};
      prescriptionData.createDate = arr2[1];
      prescriptionData.diagnosis = arr2[2];
      prescriptionData.height = arr2[3];
      prescriptionData.weight = arr2[4];
      prescriptionData.doctorId = doctorData.id;
      prescriptionData.patientId = patientId;

      let drugListData = [];
      let scheduleListData = [];

      list1.forEach((inner) => {
        let innerArr = inner.split("|");
        let drugData = {};
        drugData.name = innerArr[1];
        drugData.strength = innerArr[2];
        drugData.preparation = innerArr[3];
        drugData.route = innerArr[4];
        drugData.direction = innerArr[5];
        drugData.frequency = innerArr[6];
        drugData.duration = innerArr[7];
        drugData.type = innerArr[8];
        drugData.instructions = innerArr[9];
        drugData.total = innerArr[10];
        drugListData.push(drugData);
      });

      prescriptionData.drugList = drugListData;

      console.log(
        "FRANC PARSED DATA",
        doctorData,
        prescriptionData,
        drugListData,
        scheduleListData
      );

      this.checkAndInsertSubDoctor(doctorData, () =>
        this.addEditEsPrescription(
          prescriptionData,
          cb,
          (drugId, prescriptionId, drugObj) =>
            this.createScheduleFromDrug(
              drugId,
              prescriptionId,
              drugObj,
              patientId
            )
        )
      );
    } catch (error) {
      alert("Error reading QR Code");
      cb && cb();
    }
  }

  @action checkAndInsertSubDoctor = (doctorData, cb) => {
    db.transaction(function (tx) {
      let sql1 = "SELECT * FROM ES_USER WHERE ID = ?";
      let val1 = [doctorData.id];
      tx.executeSql(sql1, val1, function (tx, res) {
        if (res.rows.length == 0) {
          let sql2 = "INSERT INTO ES_USER (ID,TYPE,NAME) VALUES (?,?,?)";
          let val2 = [
            doctorData.id,
            constants.TYPE_SUB_DOCTOR,
            doctorData.name,
          ];
          tx.executeSql(sql2, val2);
        }
        cb && cb();
      });
    });
  };

  @action insertSchedules = (list, cb) => {
    db.transaction(function (tx) {
      list.forEach((schedule, i) => {
        let id = uuid.v4();
        let val = [
          id,
          schedule.intakeDate,
          schedule.prescriptionId,
          schedule.drugId,
          schedule.patientId,
          constants.STATUS_PENDING,
        ];

        tx.executeSql(
          "INSERT INTO ES_SCHEDULE (ID, INTAKE_DATE, PRESCRIPTION_ID, DRUG_ID, PATIENT_ID, STATUS) VALUES (?,?,?,?,?,?)",
          val,
          (tx, results) => {
            cb && cb(id, schedule, i);
          }
        );
      });
    });
  };

  @action createScheduleFromDrug(drugId, prescriptionId, drugObj, patientId) {
    //create schedule from drug
    let scheduleList = [];
    let dateList = this.createDateList(drugObj);
    dateList.forEach((date, i) => {
      let schedule = {};
      schedule.intakeDate = date;
      schedule.prescriptionId = prescriptionId;
      schedule.drugId = drugId;
      schedule.patientId = patientId;
      schedule.drugName = drugObj.name;
      scheduleList.push(schedule);
    });
    this.insertSchedules(scheduleList, (id, schedule, i) => {
      let notifId = this.convertToNotifId(id);
      PushNotification.localNotificationSchedule({
        id: notifId,
        title: "Expresscript",
        date: new Date(schedule.intakeDate),
        message: "Please take your medicine: " + schedule.drugName,
        allowWhileIdle: true,
        channelId: constants.CHANNEL_ID,
      });
    });
  }

  @action createDateList(drugObj) {
    let dateList = [];
    let duration = drugObj.duration;
    let type = drugObj.type;
    let frequency = drugObj.frequency;
    let startDate = new Date();
    if (duration != null) {
      for (let i = 0; i < duration; i++) {
        if (type != null) {
          let typeCount = 0;
          if (type == 1) {
            //days
            typeCount = 1;
          } else if (type == 2) {
            //weeks
            typeCount = 7;
          } else if (type == 3) {
            //months
            typeCount = 30;
          }
          for (let j = 0; j < typeCount; j++) {
            if (frequency != null) {
              let freqCount = 0;
              if (frequency == 3) {
                //once a day
                freqCount = 1;
              } else if (frequency == 4) {
                //twice daily
                freqCount = 2;
              } else if (frequency == 5) {
                //thrice daily
                freqCount = 3;
              } else if (frequency == 6) {
                //four times a day
                freqCount = 4;
              } else if (frequency == 7) {
                //every hour
                freqCount = 24;
              }
              let skipHours = 24 / freqCount;
              for (let k = 0; k < freqCount; k++) {
                startDate = this.addHours(startDate, skipHours);
                dateList.push(startDate.getTime());
              }
            }
          }
        }
      }
    }
    console.log("FRANC DATE LIST 2", dateList);
    return dateList;
  }

  @action addHours(date, h) {
    var copiedDate = date;
    copiedDate.setTime(date.getTime() + h * 60 * 60 * 1000);
    return copiedDate;
  }

  @action checkIfDigitsOnly(str) {
    return str.match(/^[0-9]+$/) != null;
  }

  @action updateSchedule = (item, status, cb) => {
    db.transaction(function (tx) {
      let val = [status, item.id];
      let sql = "UPDATE ES_SCHEDULE SET STATUS = ? WHERE ID = ?";
      tx.executeSql(sql, val, (tx, results) => {
        let val2 = [item.drugId];
        let sql2 =
          "UPDATE ES_DRUG SET TOTAL = (TOTAL-1) WHERE ID = ? AND TOTAL > 0";
        tx.executeSql(sql2, val2, (tx, results) => {
          cb && cb();
        });
      });
    });
  };

  @action editTotal = (request, cb) => {
    db.transaction(function (tx) {
      let val = [request.total, request.id];
      let sql = "UPDATE ES_DRUG SET TOTAL = ? WHERE ID = ?";
      tx.executeSql(sql, val, (tx, results) => {
        cb && cb(results);
      });
    });
  };
}
