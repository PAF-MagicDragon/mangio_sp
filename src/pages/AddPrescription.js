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
import ESRadioWithLabel from "../components/ESRadioWithLabel";

const AddPrescription = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  const store = useContext(ESContext);
  const patient = route.params;

  useEffect(() => {
    setRequest({
      doctorId: store.mainUser.id,
      patientId: patient.id,
    });
  }, []);

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

  return (
    request && (
      <SafeAreaView style={styles.viewMain}>
        <View style={styles.viewSub}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardAvoid}
            >
              <ESTextFieldWithLabel
                label="Diagnosis"
                onChangeText={(val) => onChange(val, request, "diagnosis")}
                maxLength={250}
                value={request.diagnosis}
                numberOfLines={3}
                multiline={true}
                style={{ textAlignVertical: "top" }}
              />
              <ESButton title="Submit" customClick={addEditPrescription} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default AddPrescription;
