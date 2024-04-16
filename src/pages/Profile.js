import React, { useState, useEffect, useContext } from "react";
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
import ESRadio from "../components/ESRadio";

const Profile = ({ navigation }) => {
  let [type, setType] = useState("");
  const store = useContext(ESContext);

  useEffect(() => {
    setType(store.mainUser.type);
  }, []);

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
          "Profile Updated",
          [
            {
              text: "Ok",
              onPress: () => {
                store.initializeMainUser(
                  () => navigation.navigate("Dashboard")
                  // navigation.popToTop()
                );
              },
            },
          ],
          { cancelable: false }
        );
      } else alert("Profile Update Failed");
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
            <ESLabel
              text={
                type == constants.TYPE_MAIN_DOCTOR ? "IM DOCTOR" : "IM PATIENT"
              }
            />
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

            <ESRadio
              value={store.mainUser.type}
              options={[
                { label: "Doctor", value: constants.TYPE_MAIN_DOCTOR },
                { label: "Patient", value: constants.TYPE_MAIN_PATIENT },
              ]}
              onChange={(val) => {
                onChange(val, store.mainUser, "type");
                setType(val);
                store.updateType();
                console.log("FRANC STATE", type);
              }}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
