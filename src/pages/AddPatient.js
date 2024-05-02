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
import ESDatePicker from "../components/ESDatePicker";
import cloneDeep from "lodash/cloneDeep";

const AddPatient = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  const store = useContext(ESContext);
  const patient = route.params;

  useEffect(() => {
    if (patient != null) {
      setRequest(cloneDeep(patient));
    } else {
      setRequest({
        type: constants.TYPE_SUB_PATIENT,
        gender: constants.GENDER_MALE,
      });
    }
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
              />
              <View style={styles.row}>
                <ESTextFieldWithLabel
                  label="Contact No"
                  onChangeText={(val) => onChange(val, request, "contactNo")}
                  maxLength={50}
                  value={request.contactNo}
                  keyboardType="number-pad"
                  isRowItem
                  withMarginRight
                />
                <ESTextFieldWithLabel
                  label="Email"
                  onChangeText={(val) => onChange(val, request, "email")}
                  maxLength={250}
                  value={request.email}
                  keyboardType="email-address"
                  isRowItem
                />
              </View>
              <View>
                <View style={styles.row}>
                  <ESRadioWithLabel
                    label="Gender"
                    value={request.gender}
                    options={constants.LIST_GENDER}
                    onChange={(val) => onChange(val, request, "gender")}
                    isRowItem
                    withMarginRight
                  />
                  <ESDatePicker
                    label="Birthday"
                    value={request.bday}
                    onChange={(val) => onChange(val, request, "bday")}
                    isRowItem
                  />
                </View>
              </View>
              <ESButton title="Save" customClick={addEditPatient} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default AddPatient;
