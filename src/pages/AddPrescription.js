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

const AddPrescription = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  let [drugs, setDrugs] = useState(null);
  const store = useContext(ESContext);
  const patient = route.params;

  useEffect(() => {
    setRequest({
      doctorId: store.mainUser.id,
      patientId: patient.id,
    });
  }, []);

  let addDrug = (item) => {
    navigation.navigate("AddDrug", item);
  };

  let deleteDrug = (item) => {
    alert("TODO Delete Drug");
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
    request && (
      <SafeAreaView style={styles.viewMain}>
        <View style={styles.viewSub}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardAvoid}
            >
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
                list={drugs}
                customPanel={(item) => {
                  return (
                    <View>
                      <Text>Id: {item.id}</Text>
                    </View>
                  );
                }}
                customViewClick={(item) => alert("VIEW" + item.id)}
                customAddClick={() => addDrug(request)}
                customEditClick={(item) => alert("EDIT" + item.id)}
                customDeleteClick={(item) => deleteDrug(item)}
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
