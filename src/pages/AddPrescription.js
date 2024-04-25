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
import * as constants from "../helpers/constants";
import ESValueWithLabel from "../components/ESValueWithLabel";
import ESListView from "../components/ESListView";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const AddPrescription = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  let [drugList, setDrugList] = useState([]);
  const store = useContext(ESContext);
  const isFocused = useIsFocused();
  const patient = route.params;

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log("DRUG LIST ON FOCUS", store.tempDrugList);
      setDrugList([...store.tempDrugList]);
      console.log("DRUG LIST ON FOCUS 2", store.tempDrugList);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  useEffect(() => {
    console.log("DRUG LIST ON USE EFFECT", store.tempDrugList);
    setRequest({
      doctorId: store.mainUser.id,
      patientId: patient.id,
    });
    store.tempDrugList = [];
    setDrugList([...store.tempDrugList]);
  }, []);

  let addDrug = () => {
    console.log("DRUG LIST ON NAV", store.tempDrugList);
    navigation.navigate("AddDrug");
  };

  let deleteDrug = (item, index) => {
    alert("TODO Delete Drug:" + index);
    console.log("DRUG LIST ON DEL 1", store.tempDrugList);
    store.tempDrugList.splice(index, 1);
    setDrugList([...store.tempDrugList]);
    console.log("DRUG LIST ON DEL 2", store.tempDrugList);
  };

  let addEditPrescription = () => {
    if (request.diagnosis == null || request.diagnosis.length == 0) {
      alert("Diagnosis is required");
      return;
    }
    store.addEditEsPrescription(request, (results) => {
      console.log("Results", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Prescription Updated",
          [
            {
              text: "Ok",
              onPress: () => {
                navigation.pop();
              },
            },
          ],
          { cancelable: false }
        );
      } else alert("Prescription Update Failed");
    });
  };

  let onChange = (val, obj, field) => {
    obj[field] = val;
    setRequest((request) => ({
      ...request,
      ...obj,
    }));
  };

  let currDate = new Date().toLocaleString("en-GB", {
    hour12: false,
  });

  return (
    request &&
    isFocused && (
      <SafeAreaView style={styles.viewMain}>
        <View style={styles.viewSub}>
          {/* <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardAvoid}
            > */}
          <ESValueWithLabel label="Patient Name" value={patient.name} />
          <ESValueWithLabel label="Date" value={currDate} />
          <ESTextFieldWithLabel
            label="Diagnosis"
            onChangeText={(val) => onChange(val, request, "diagnosis")}
            maxLength={250}
            value={request.diagnosis}
            numberOfLines={3}
            multiline={true}
            style={{ textAlignVertical: "top" }}
          />
          <ESListView
            header="Drugs"
            list={drugList}
            customPanel={(item) => {
              return (
                <View>
                  <Text>Name: {item.name}</Text>
                  <Text>Strength: {item.strength}</Text>
                  <Text>Dose: {item.dose}</Text>
                  <Text>Prescription: {item.prescription}</Text>
                  <Text>Route: {item.route}</Text>
                  <Text>Direction: {item.direction}</Text>
                  <Text>Route: {item.route}</Text>
                </View>
              );
            }}
            customViewClick={(item) => alert("VIEW" + item.id)}
            customAddClick={addDrug}
            customEditClick={(item, index) =>
              alert("EDIT: " + item.id + "INDEX: " + index)
            }
            customDeleteClick={(item, index) => deleteDrug(item, index)}
          />
          <ESButton title="Submit" customClick={addEditPrescription} />
          {/* </KeyboardAvoidingView>
          </ScrollView> */}
        </View>
      </SafeAreaView>
    )
  );
};

export default AddPrescription;
