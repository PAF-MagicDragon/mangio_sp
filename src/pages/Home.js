import React, { useEffect, useContext } from "react";
import { View, Text, SafeAreaView } from "react-native";
import ESButton from "../components/ESButton";
import ESLabel from "../components/ESLabel";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";

const Home = ({ navigation }) => {
  const store = useContext(ESContext);

  let onClick = (type) => {
    // if (store.mainUser.id != null) {
    //   navigation.replace("Dashboard");
    // } else {
    store.mainUser.type = type;
    navigation.replace("Profile");
    // }
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        <ESButton
          subButton
          title="I am a Doctor"
          customClick={() => onClick(constants.TYPE_MAIN_DOCTOR)}
        />
        <ESButton
          title="I am a Patient"
          customClick={() => onClick(constants.TYPE_MAIN_PATIENT)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
