import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  Platform,
} from "react-native";
import ESValueWithLabel from "../components/ESValueWithLabel";
import ESButton from "../components/ESButton";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import ESListView from "../components/ESListView";
import * as constants from "../helpers/constants";
import ESRadioWithLabel from "../components/ESRadioWithLabel";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import QRCode from "react-native-qrcode-svg";
import ESSingleLabelValue from "../components/ESSingleLabelValue";

const ViewPatient = ({ navigation, route }) => {
  let [prescriptions, setPrescriptions] = useState(null);
  const store = useContext(ESContext);
  const patient = route.params;
  const isFocused = useIsFocused();

  let refMap = [];

  let refreshList = () => {
    store.getPrescriptions(store.mainUser.id, patient.id, (list) =>
      setPrescriptions(list)
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshList();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  // useEffect(() => {
  //   refreshList();
  // }, []);

  let addEditPrescription = (item) => {
    navigation.navigate("AddPrescription", {
      patientId: patient.id,
      item: item,
    });
  };

  let viewPrescription = (item) => {
    navigation.navigate("ViewPrescription", item);
  };

  let deletePrescription = (item) => {
    store.deletePrescription(item.id, (results) => {
      console.log("Results delete prescription", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Prescription Deleted",
          [
            {
              text: "Ok",
              onPress: () => {
                refreshList();
              },
            },
          ],
          { cancelable: false }
        );
      } else alert("Prescription Delete Failed");
    });
  };

  const createPDF = async (string, id) => {
    let myHtml = string;
    console.log("FRANC HTML", myHtml);
    try {
      let PDFOptions = {
        html: myHtml,
        fileName: "Expresscript_" + new Date().getTime(),
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      alert(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const printPDF = (item) => {
    let pdfString = constants.HTML_TEMPLATE;
    let drugString = constants.DRUG_TEMPLATE;
    let doctorData = store.mainUser;
    let prescriptionData = item;
    let patientData = patient;

    refMap[item.id].toDataURL((val) => {
      let qrImage = val;
      console.log("FRANC BASE64", val);
      store.getDrugs(prescriptionData.id, (drugList) => {
        pdfString = pdfString.replace(
          "[clinicHospital]",
          doctorData.clinicHospital
        );
        pdfString = pdfString.replace("[doctorAddress]", doctorData.address);
        pdfString = pdfString.replace(
          "[doctorContactNo]",
          doctorData.contactNo
        );
        pdfString = pdfString.replace("[doctorEmail]", doctorData.email);
        pdfString = pdfString.replace("[doctorName]", doctorData.name);
        pdfString = pdfString.replace(
          "[doctorLicenseNo]",
          doctorData.licenseNo
        );
        pdfString = pdfString.replace("[doctorPtrNo]", doctorData.ptrNo);
        pdfString = pdfString.replace("[patientName]", patientData.name);
        pdfString = pdfString.replace("[patientAddress]", patientData.address);
        pdfString = pdfString.replace(
          "[patientHeight]",
          prescriptionData.height
        );
        pdfString = pdfString.replace(
          "[patientWeight]",
          prescriptionData.weight
        );
        let age = Math.floor(
          (new Date() - new Date(patientData.bday)) / 31557600000
        );
        pdfString = pdfString.replace("[patientAge]", age);
        pdfString = pdfString.replace(
          "[prescriptionDate]",
          store.convertDateIntToString(prescriptionData.createDate)
        );

        let drugContent = "";
        drugList.forEach((drug, i) => {
          let innerString = drugString;
          let drugDetails = drug.name + " " + drug.strength + " " + drug.dose;
          innerString = innerString.replace("[drugDetails]", drugDetails);
          innerString = innerString.replace(
            "[drugInstructions]",
            drug.instructions
          );
          drugContent = drugContent.concat(innerString);
        });

        pdfString = pdfString.replace("[drugContent]", drugContent);

        createPDF(pdfString, item.id);
      });
    });
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        {/* <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}> */}
        <View style={styles.withPadding}>
          <ESValueWithLabel
            label="Name"
            value={patient.name}
            noMarginTopValue
          />
          <ESValueWithLabel
            label="Address"
            value={patient.address}
            noMarginTopValue
          />
          <View style={styles.row}>
            <ESValueWithLabel
              label="Contact No"
              value={patient.contactNo}
              noMarginTopValue
              isRowItem
              withMarginRight
            />
            <ESValueWithLabel
              label="Email"
              value={patient.email}
              noMarginTopValue
              isRowItem
            />
          </View>
          <View style={styles.row}>
            <ESValueWithLabel
              label="Gender"
              value={store.getLabelFromValue(
                patient.gender,
                constants.LIST_GENDER
              )}
              noMarginTopValue
              isRowItem
              withMarginRight
            />
            <ESValueWithLabel
              label="Birthday"
              value={store.convertDateIntToString(patient.bday)}
              noMarginTopValue
              isRowItem
            />
          </View>
        </View>
        <View style={styles.withPadding}>
          <ESListView
            header="Prescriptions"
            list={prescriptions}
            customPanel={(item) => {
              return (
                <View>
                  <ESLabel
                    text={store.convertDateIntToString(item.createDate)}
                    customStyle={styles.subHeader}
                  />
                  <ESSingleLabelValue
                    label="Diagnosis"
                    value={item.diagnosis}
                    customStyle={styles.valueNoMargin}
                  />
                  <View style={styles.row}>
                    <ESSingleLabelValue
                      label="Height"
                      value={item.height}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                      withMarginRight
                    />
                    <ESSingleLabelValue
                      label="Weight"
                      value={item.weight}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                    />
                  </View>
                  <View style={{ opacity: 0, height: 0 }}>
                    <QRCode
                      value={item.id}
                      getRef={(c) => (refMap[item.id] = c)}
                    />
                  </View>
                </View>
              );
            }}
            customViewClick={(item) => viewPrescription(item)}
            customAddClick={() => addEditPrescription()}
            customEditClick={(item) => addEditPrescription(item)}
            customDeleteClick={(item) =>
              store.confirm(
                () => deletePrescription(item),
                "Confirm",
                "Are you sure you want to delete this prescription?"
              )
            }
            customActionClick={(item) => printPDF(item)}
            customActionIcon="print-outline"
          />
        </View>

        {/* </KeyboardAvoidingView>
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default ViewPatient;
