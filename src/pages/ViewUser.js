import React, { useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import ESTextField from "../components/ESTextField";
import ESButton from "../components/ESButton";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "ESDatabase.db" });

const ViewUser = () => {
  let [inputUserId, setInputUserId] = useState("");
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_user where user_id = ?",
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log("len", len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert("No user found");
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
          <ESButton title="Search User" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10,
            }}
          >
            <Text>User Id: {userData.user_id}</Text>
            <Text>User Name: {userData.user_name}</Text>
            <Text>User Contact: {userData.user_contact}</Text>
            <Text>User Address: {userData.user_address}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;
