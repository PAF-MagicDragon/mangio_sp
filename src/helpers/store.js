import { observable, action, computed } from "mobx";
import { openDatabase } from "react-native-sqlite-storage";
import * as constants from "./constants";
import { Alert, Platform } from "react-native";
import uuid from "react-native-uuid";
import RNHTMLtoPDF from "react-native-html-to-pdf";

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
      "ID VARCHAR(50) PRIMARY KEY, PRESCRIPTION_ID VARCHAR(50), NAME VARCHAR(250), STRENGTH VARCHAR(50), DOSE VARCHAR(50), PREPARATION INT(2), ROUTE INT(2), DIRECTION INT(2), FREQUENCY INT(2), DURATION VARCHAR(50), TYPE INT(2), INSTRUCTIONS VARCHAR(200), TOTAL INT(3), REFILLS INT(3)"
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

  @action mapPrescriptionFromDb = (item) => {
    console.log("FRANC ITEM", item);
    let prescription = {};
    prescription.id = item["ID"];
    prescription.createDate = item["CREATE_DATE"];
    prescription.diagnosis = item["DIAGNOSIS"];
    prescription.doctorId = item["DOCTOR_ID"];
    prescription.patientId = item["PATIENT_ID"];
    prescription.height = item["HEIGHT"];
    prescription.weight = item["WEIGHT"];
    prescription.doctorName = item["NAME"];
    return prescription;
  };

  @action mapDrugFromDb = (item) => {
    let drug = {};
    drug.id = item["ID"];
    drug.prescriptionId = item["PRESCRIPTION_ID"];
    drug.name = item["NAME"];
    drug.strength = item["STRENGTH"];
    drug.dose = item["DOSE"];
    drug.preparation = item["PREPARATION"];
    drug.route = item["ROUTE"];
    drug.direction = item["DIRECTION"];
    drug.frequency = item["FREQUENCY"];
    drug.duration = item["DURATION"];
    drug.type = item["TYPE"];
    drug.instructions = item["INSTRUCTIONS"];
    drug.total = item["TOTAL"];
    drug.refills = item["REFILLS"];
    return drug;
  };

  @action mapTemplateFromDb = (item) => {
    let template = {};
    template.id = item["ID"];
    template.brand = item["BRAND"];
    template.generic = item["GENERIC"];
    template.formulation = item["FORMULATION"];
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
        "SELECT * FROM ES_USER WHERE TYPE = ? ORDER BY NAME",
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
        "SELECT p.*, u.name FROM ES_PRESCRIPTION p, ES_USER u WHERE p.DOCTOR_ID = u.id AND p.DOCTOR_ID = ? AND p.PATIENT_ID = ? ORDER BY p.CREATE_DATE DESC",
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

  @action getDrugs = (prescriptionId, cb) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ES_DRUG WHERE PRESCRIPTION_ID = ? ORDER BY NAME",
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

  @action getTemplates = (cb) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ES_TEMPLATE ORDER BY BRAND, GENERIC",
        [],
        (tx, results) => {
          console.log("TEMPLATE RESULTS");
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(this.mapTemplateFromDb(results.rows.item(i)));
          }
          cb && cb(temp);
        }
      );
    });
  };

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
          request.ptrNo,
          request.bday,
          request.gender,
        ];
        tx.executeSql(
          "INSERT INTO ES_USER (ID,TYPE,NAME,ADDRESS,CONTACT_NUMBER,EMAIL,CLINIC_HOSPITAL,SPECIALIZATION,SIGNATURE,LICENSE_NO,PTR_NO,BDAY,GENDER) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          val,
          (tx, results) => {
            cb != null && cb(results);
          }
        );
      });
    }
  };

  @action addEditEsPrescription = (request, cb) => {
    console.log("FRANC ADD PRESCRIPTION 1", request);
    if (request.id != null) {
      console.log("FRANC ADD PRESCRIPTION 2", request);
      db.transaction(function (tx) {
        let val = [
          request.createDate,
          request.diagnosis,
          request.height,
          request.weight,
          request.id,
        ];
        console.log("FRANC ADD PRESCRIPTION 2.1", val);
        tx.executeSql(
          "UPDATE ES_PRESCRIPTION SET (CREATE_DATE,DIAGNOSIS,HEIGHT,WEIGHT) = (?,?,?,?) WHERE ID = ? ",
          val,
          (tx, results) => {
            console.log("FRANC ADD PRESCRIPTION 2.2", results);
            tx.executeSql(
              "DELETE FROM ES_DRUG WHERE PRESCRIPTION_ID = ?",
              [request.id],
              (tx, results) => {
                console.log("FRANC ADD PRESCRIPTION 2.3", results);
                request.drugList.forEach((drug, i) => {
                  let innerId = uuid.v4();
                  let innerVal = [
                    innerId,
                    request.id,
                    drug.name,
                    drug.strength,
                    drug.dose,
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
                    "INSERT INTO ES_DRUG (ID,PRESCRIPTION_ID,NAME,STRENGTH,DOSE,PREPARATION,ROUTE,DIRECTION,FREQUENCY,DURATION,TYPE,INSTRUCTIONS,TOTAL,REFILLS) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    innerVal,
                    (tx, results) => {
                      console.log("FRANC ADD PRESCRIPTION 2.4", results);
                    }
                  );
                });
              }
            );
            cb != null && cb(results);
          }
        );
      });
    } else {
      console.log("FRANC ADD PRESCRIPTION 3", request);
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
        console.log("FRANC ADD PRESCRIPTION 4", val);
        tx.executeSql(
          "INSERT INTO ES_PRESCRIPTION (ID,CREATE_DATE,DIAGNOSIS,DOCTOR_ID,PATIENT_ID,HEIGHT,WEIGHT) VALUES (?,?,?,?,?,?,?)",
          val,
          (tx, results) => {
            console.log("FRANC ADD PRESCRIPTION 5", results);
            console.log("FRANC ADD PRESCRIPTION 5.1", tx, request, id);
            // this.saveDrugList(tx, request, id);
            console.log("FRANC ADD PRESCRIPTION 5.2", tx, request, id);
            request.drugList.forEach((drug, i) => {
              let innerId = uuid.v4();
              let innerVal = [
                innerId,
                id,
                drug.name,
                drug.strength,
                drug.dose,
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
                "INSERT INTO ES_DRUG (ID,PRESCRIPTION_ID,NAME,STRENGTH,DOSE,PREPARATION,ROUTE,DIRECTION,FREQUENCY,DURATION,TYPE,INSTRUCTIONS,TOTAL,REFILLS) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                innerVal,
                (tx, results) => {
                  console.log("FRANC ADD PRESCRIPTION 5.3", results);
                }
              );
            });
            cb != null && cb(results);
          }
        );
      });
    }
  };

  @action saveDrugList = (tx, request, id) => {
    console.log("FRANC ADD PRESCRIPTION 6", request);
    request.drugList.forEach((drug, i) => {
      let innerId = uuid.v4();
      let innerVal = [
        innerId,
        id,
        drug.name,
        drug.strength,
        drug.dose,
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
      console.log("FRANC ADD PRESCRIPTION 7", innerVal);
      tx.executeSql(
        "INSERT INTO ES_DRUG (ID,PRESCRIPTION_ID,NAME,STRENGTH,DOSE,PREPARATION,ROUTE,DIRECTION,FREQUENCY,DURATION,TYPE,INSTRUCTIONS,TOTAL,REFILLS) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        innerVal,
        (tx, results) => {}
      );
    });
  };

  @action deleteRecord = (table, id, whereField, cb) => {
    console.log("FRANC DEL RECORD", table);
    db.transaction(function (tx) {
      let val = [id];
      let sql = "DELETE FROM " + table + " WHERE " + whereField + "";
      console.log("DELETE RECORD SQL:", sql);
      tx.executeSql(sql, val, (tx, results) => {
        cb != null && cb(results);
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

  @action deletePrescription = (id, cb) => {
    this.deleteRecord("ES_DRUG", id, "PRESCRIPTION_ID = ?", null);
    this.deleteRecord("ES_PRESCRIPTION", id, "ID = ?", cb);
  };

  //   @computed get filteredLists() {
  //     const matchCase = new RegExp(this.filter, "i");
  //     return this.lists.filter(
  //       (list) => !this.filter || matchCase.test(list.value)
  //     );
  //   }

  @action initializeTemplateData = (cb) => {
    this.getTemplates((list) => {
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

  @action formDropDownData = (list) => {
    let temp = [];
    list.forEach((data) => {
      temp.push({ label: data.label, value: data.value });
    });
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

  @action addValToQrString(s, val) {
    console.log("FRANC ADD VAL", s, val);
    let string = s;
    string = string.concat("|");
    if (val != null) {
      string = string.concat(val);
    }
    console.log("FRANC ADD STRING", string);
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
      inner = this.addValToQrString(inner, drug.dose);
      inner = this.addValToQrString(inner, drug.preparation);
      inner = this.addValToQrString(inner, drug.route);
      inner = this.addValToQrString(inner, drug.direction);
      inner = this.addValToQrString(inner, drug.frequency);
      inner = this.addValToQrString(inner, drug.duration);
      inner = this.addValToQrString(inner, drug.type);
      inner = this.addValToQrString(inner, drug.instructions);
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
      this.convertDateIntToString(prescriptionData.createDate)
    );
    let drugContent = "";
    drugList.forEach((drug, i) => {
      let innerString = drugString;
      let drugDetails = "";
      drugDetails = drugDetails.concat(drug.name);
      drugDetails = drugDetails.concat(" ").concat(drug.strength);
      drugDetails = drugDetails.concat(" ").concat(drug.dose);
      drugDetails = drugDetails
        .concat(" ")
        .concat(
          this.getLabelFromValue(drug.preparation, constants.LIST_PREPARATION)
        );
      drugDetails = drugDetails
        .concat(" ")
        .concat(
          this.getLabelFromValue(drug.frequency, constants.LIST_FREQUENCY)
        );
      drugDetails = drugDetails
        .concat(" ")
        .concat(
          this.getLabelFromValue(drug.direction, constants.LIST_DIRECTION)
        );
      drugDetails = drugDetails
        .concat(" ")
        .concat(this.getLabelFromValue(drug.route, constants.LIST_ROUTE));
      drugDetails = drugDetails.concat(" ").concat(drug.duration);
      drugDetails = drugDetails
        .concat(" ")
        .concat(this.getLabelFromValue(drug.type, constants.LIST_TYPE));
      innerString = innerString.replace("[drugDetails]", drugDetails);
      innerString = innerString.replace(
        "[drugInstructions]",
        drug.instructions
      );
      drugContent = drugContent.concat(innerString);
    });
    pdfString = pdfString.replace("[drugContent]", drugContent);
    imgString = imgString.replace("[encryptedString]", qrImage);
    pdfString = pdfString.replace("[qrContent]", imgString);
    return pdfString;
  }

  @action createPDF = async (string) => {
    let myHtml = string;
    try {
      let PDFOptions = {
        html: myHtml,
        fileName: "Expresscript_PDF_" + new Date().getTime(),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      alert("File saved to: " + file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  @action saveValuesFromQr(qrString, patientId) {
    let qrObj = JSON.parse(qrString);

    let string1 = qrObj.a;
    let string2 = qrObj.b;
    let string3 = qrObj.c;
    let list1 = qrObj.d;

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
    list1.forEach((inner) => {
      let innerArr = inner.split("|");
      console.log("FRANC INNER", inner, innerArr);
      let drugData = {};
      drugData.name = innerArr[1];
      drugData.strength = innerArr[2];
      drugData.dose = innerArr[3];
      drugData.preparation = innerArr[4];
      drugData.route = innerArr[5];
      drugData.direction = innerArr[6];
      drugData.frequency = innerArr[7];
      drugData.duration = innerArr[8];
      drugData.type = innerArr[9];
      drugData.instructions = innerArr[10];
      drugListData.push(drugData);
    });

    console.log(
      "FRANC PARSED DATA",
      doctorData,
      prescriptionData,
      drugListData
    );
  }
}
