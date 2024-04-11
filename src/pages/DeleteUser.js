import React, { useState } from "react";
import { Text, View, Alert, SafeAreaView } from "react-native";
import ESTextField from "../components/ESTextField";
import ESButton from "../components/ESButton";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "ESDatabase.db" });

const DeleteUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState("");

  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM  table_user where user_id=?",
        [inputUserId],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "User deleted successfully",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeScreen"),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert("Please insert a valid User Id");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <ESTextField
            placeholder="Enter User Id"
            onChangeText={(inputUserId) => setInputUserId(inputUserId)}
            style={{ padding: 10 }}
          />
          <ESButton title="Delete User" customClick={deleteUser} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;
