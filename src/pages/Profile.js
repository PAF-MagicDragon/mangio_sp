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
  let [request, setRequest] = useState(null);
  const store = useContext(ESContext);

  useEffect(() => {
    setRequest(JSON.parse(JSON.stringify(store.mainUser)));
  }, []);

  let updateProfile = () => {
    if (request.name == null || request.name.length == 0) {
      alert("Name is required");
      return;
    }
    if (request.address == null || request.address.length == 0) {
      alert("Address is required");
      return;
    }
    store.updateProfile(request, (results) => {
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

  let onChange = (val, obj, field) => {
    console.log("FRANC STATE CHANGE BEFORE", request);
    // console.log("FRANC ONCHANGE", val, store, field);
    obj[field] = val;

    setRequest((request) => ({
      ...request,
      ...obj,
    }));
    console.log("FRANC STATE CHANGE AFTER", request);
    // setType(
    //   type == constants.TYPE_MAIN_DOCTOR
    //     ? constants.TYPE_MAIN_PATIENT
    //     : constants.TYPE_MAIN_DOCTOR
    // );
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
              <ESLabel
                text={
                  request.type == constants.TYPE_MAIN_DOCTOR
                    ? "IM DOCTOR"
                    : "IM PATIENT"
                }
              />
              <ESTextField
                placeholder="Enter Name"
                onChangeText={(val) => onChange(val, request, "name")}
                maxLength={100}
                value={request.name}
              />
              <ESTextField
                placeholder="Enter Address"
                onChangeText={(val) => onChange(val, request, "address")}
                maxLength={250}
                value={request.address}
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
                value={request.type}
                options={[
                  { label: "Doctor", value: constants.TYPE_MAIN_DOCTOR },
                  { label: "Patient", value: constants.TYPE_MAIN_PATIENT },
                ]}
                onChange={(val) => onChange(val, request, "type")}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default Profile;
