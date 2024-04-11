import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";
import ESTextField from "../components/ESTextField";
import ESButton from "../components/ESButton";
import uuid from "react-native-uuid";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "ESDatabase.db" });

const RegisterUser = ({ navigation }) => {
  let [userName, setUserName] = useState("");
  let [userContact, setUserContact] = useState("");
  let [userAddress, setUserAddress] = useState("");

  let register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert("Please fill name");
      return;
    }
    if (!userContact) {
      alert("Please fill Contact Number");
      return;
    }
    if (!userAddress) {
      alert("Please fill Address");
      return;
    }

    db.transaction(function (tx) {
      let id = uuid.v4();
      tx.executeSql(
        "INSERT INTO table_user (user_id, user_name, user_contact, user_address) VALUES (?,?,?,?)",
        [id, userName, userContact, userAddress],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "You are Registered Successfully",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Registration Failed");
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <ESTextField
                placeholder="Enter Name"
                onChangeText={(userName) => setUserName(userName)}
                style={{ padding: 10 }}
              />
              <ESTextField
                placeholder="Enter Contact No"
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <ESTextField
                placeholder="Enter Address"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: "top", padding: 10 }}
              />
              <ESButton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
