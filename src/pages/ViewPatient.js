import React, { useState, useEffect, useContext } from "react";
import { View, Alert, SafeAreaView, Text, Platform } from "react-native";
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
import ESSingleLabelValue from "../components/ESSingleLabelValue";

const ViewPatient = ({ navigation, route }) => {
  let [prescriptions, setPrescriptions] = useState(null);

  const store = useContext(ESContext);
  const patient = route.params;

  let refreshList = () => {
    store.getPrescriptions(store.mainUser.id, patient.id, false, (list) =>
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
    store.deletePrescription(item.id, false, (results) => {
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

  let viewPDF = (item) => {
    store.getDrugs(item.id, (drugList) => {
      navigation.navigate("ViewPdf", {
        doctor: store.mainUser,
        prescription: item,
        patient: patient,
        list: drugList,
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
              label="Age"
              value={store.getAgeFromBday(patient.bday)}
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
            customActionClick={(item) => viewPDF(item)}
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
