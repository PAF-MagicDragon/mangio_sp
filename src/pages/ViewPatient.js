import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";
import ESTextFieldWithLabel from "../components/ESTextFieldWithLabel";
import ESButton from "../components/ESButton";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import ESListView from "../components/ESListView";
import * as constants from "../helpers/constants";
import ESRadioWithLabel from "../components/ESRadioWithLabel";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const ViewPatient = ({ navigation, route }) => {
  let [prescriptions, setPrescriptions] = useState(null);
  const store = useContext(ESContext);
  const patient = route.params;
  const isFocused = useIsFocused();

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

  let addPrescription = (item) => {
    navigation.navigate("AddPrescription", item);
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

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        {/* <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}> */}
        <ESLabel text="SELECTED PATIENT:" />
        <ESValue text={JSON.stringify(patient)} />
        <ESListView
          header="Prescriptions"
          list={prescriptions}
          customPanel={(item) => {
            let dateString = new Date(item.createDate).toLocaleString("en-GB", {
              hour12: false,
            });
            return (
              <View>
                <Text>Id: {item.id}</Text>
                <Text>Date: {item.createDate}</Text>
                <Text>Date 2: {dateString}</Text>
                <Text>Diagnosis: {item.diagnosis}</Text>
              </View>
            );
          }}
          customViewClick={(item) => viewPrescription(item)}
          customAddClick={() => addPrescription(patient)}
          customEditClick={(item) => alert("EDIT" + item.id)}
          customDeleteClick={(item) => deletePrescription(item)}
          customActionClick={(item) => alert("PRINT" + item.id)}
          customActionIcon="print-outline"
        />
        {/* </KeyboardAvoidingView>
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default ViewPatient;
