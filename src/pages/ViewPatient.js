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

  const printPDF = (item) => {
    let doctorData = store.mainUser;
    let prescriptionData = item;
    let patientData = patient;
    refMap[item.id].toDataURL((val) => {
      let qrImage = val;
      store.getDrugs(prescriptionData.id, (drugList) => {
        let pdfString = store.createHtmlString(
          doctorData,
          prescriptionData,
          patientData,
          drugList,
          qrImage
        );
        store.createPDF(pdfString);
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
                      value={store.createQrString(
                        store.mainUser,
                        item,
                        patient,
                        item.drugList
                      )}
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
