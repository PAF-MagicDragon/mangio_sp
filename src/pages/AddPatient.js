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

const AddPatient = ({ navigation }) => {
  let [request, setRequest] = useState(null);
  const store = useContext(ESContext);

  useEffect(() => {
    setRequest({
      type: constants.TYPE_SUB_PATIENT,
      gender: constants.GENDER_MALE,
    });
  }, []);

  let addEditPatient = () => {
    if (request.name == null || request.name.length == 0) {
      alert("Name is required");
      return;
    }
    if (request.address == null || request.address.length == 0) {
      alert("Address is required");
      return;
    }
    store.addEditEsUser(request, (results) => {
      console.log("Results", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Patient Updated",
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
      } else alert("Patient Update Failed");
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
                label="Name"
                onChangeText={(val) => onChange(val, request, "name")}
                maxLength={100}
                value={request.name}
              />
              <ESTextFieldWithLabel
                label="Address"
                onChangeText={(val) => onChange(val, request, "address")}
                maxLength={250}
                value={request.address}
                numberOfLines={3}
                multiline={true}
                style={{ textAlignVertical: "top" }}
              />
              <View style={styles.row}>
                <ESTextFieldWithLabel
                  label="Contact No"
                  onChangeText={(val) => onChange(val, request, "contactNo")}
                  maxLength={50}
                  value={request.contactNo}
                  keyboardType="number-pad"
                />
                <ESTextFieldWithLabel
                  label="Email"
                  onChangeText={(val) => onChange(val, request, "email")}
                  maxLength={250}
                  value={request.email}
                  keyboardType="email-address"
                />
              </View>
              <View>
                <View style={styles.row}>
                  <ESRadioWithLabel
                    label="Gender"
                    value={request.gender}
                    options={[
                      { label: "Male", value: constants.GENDER_MALE },
                      { label: "Female", value: constants.GENDER_FEMALE },
                    ]}
                    onChange={(val) => onChange(val, request, "gender")}
                  />
                  <ESTextFieldWithLabel
                    label="Age"
                    onChangeText={(val) => onChange(val, request, "age")}
                    maxLength={3}
                    value={request.age}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.row}>
                  <ESTextFieldWithLabel
                    label="Height"
                    onChangeText={(val) => onChange(val, request, "height")}
                    maxLength={8}
                    value={request.height}
                    keyboardType="decimal-pad"
                  />
                  <ESTextFieldWithLabel
                    label="Weight"
                    onChangeText={(val) => onChange(val, request, "weight")}
                    maxLength={8}
                    value={request.weight}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
              <ESButton title="Submit" customClick={addEditPatient} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default AddPatient;
