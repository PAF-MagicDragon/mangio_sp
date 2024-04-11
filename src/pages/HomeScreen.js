import React, { useEffect, useContext } from "react";
import { View, Text, SafeAreaView } from "react-native";
import ESButton from "../components/ESButton";
import ESLabel from "../components/ESLabel";
import styles from "../helpers/styles";
import ESContext from "../ESContext";

const HomeScreen = ({ navigation }) => {
  // const store = useContext(ESContext);

  // useEffect(() => {
  //   store.initializeTable(
  //     "table_user",
  //     "user_id INTEGER PRIMARY KEY, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255)"
  //   );
  // }, []);

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        <ESLabel text="SQLite Example" />
        {/* <ESLabel text={store.var1} /> */}
        <ESButton
          subButton
          title="Register"
          customClick={() => navigation.navigate("Register")}
        />
        <ESButton
          title="Update"
          customClick={() => navigation.navigate("Update")}
        />
        <ESButton
          title="View"
          customClick={() => navigation.navigate("View")}
        />
        <ESButton
          title="View All"
          customClick={() => navigation.navigate("ViewAll")}
        />
        <ESButton
          title="Delete"
          customClick={() => navigation.navigate("Delete")}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
