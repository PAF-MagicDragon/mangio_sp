import React, { useState, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import ESTextField from "../components/ESTextField";
import ESButton from "../components/ESButton";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";
import ESLabel from "../components/ESLabel";

const Profile = ({ navigation }) => {
  const store = useContext(ESContext);
  let isDoctor = store.mainUser.type == constants.TYPE_MAIN_DOCTOR;

  let temp = store.updateProfileRequest;

  let updateProfile = () => {
    if (temp.name == null || temp.name.length == 0) {
      alert("Name is required");
      return;
    }
    if (temp.name == null || temp.name.address == 0) {
      alert("Address is required");
      return;
    }
    store.updateProfile((results) => {
      console.log("Results", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "You are Registered Successfully",
          [
            {
              text: "Ok",
              onPress: () => navigation.navigate("DoctorDashboard"),
            },
          ],
          { cancelable: false }
        );
      } else alert("Registration Failed");
    });
  };

  let onChange = (val, store, field) => {
    console.log("FRANC ONCHANGE", val, store, field);
    store[field] = val;
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}>
            <ESLabel text={isDoctor ? "IM DOCTOR" : "IM PATIENT"} />
            <ESTextField
              placeholder="Enter Name"
              onChangeText={(val) => onChange(val, temp, "name")}
              maxLength={100}
            />
            <ESTextField
              placeholder="Enter Address"
              onChangeText={(val) => onChange(val, temp, "address")}
              maxLength={250}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: "top" }}
            />
            {/* <ESTextField
              placeholder="Enter Contact No"
              onChangeText={(userContact) => setUserContact(userContact)}
              maxLength={10}
              keyboardType="numeric"
            />
            <ESTextField
              placeholder="Enter Address"
              onChangeText={(userAddress) => setUserAddress(userAddress)}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: "top", padding: 10 }}
            /> */}
            <ESButton title="Submit" customClick={updateProfile} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
