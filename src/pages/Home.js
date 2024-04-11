import React, { useEffect, useContext } from "react";
import { View, Text, SafeAreaView } from "react-native";
import ESButton from "../components/ESButton";
import ESLabel from "../components/ESLabel";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";

const Home = ({ navigation }) => {
  const store = useContext(ESContext);

  let onClickDoctor = () => {
    if (store.mainUser.id != null) {
      navigation.navigate("DoctorDashboard");
    } else {
      store.mainUser.type = constants.TYPE_MAIN_DOCTOR;
      navigation.navigate("Profile");
    }
  };

  let onClickPatient = () => {
    if (store.mainUser.id != null) {
      navigation.navigate("PatientDashboard");
    } else {
      store.mainUser.type = constants.TYPE_MAIN_PATIENT;
      navigation.navigate("Profile");
    }
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        <ESButton subButton title="I am a Doctor" customClick={onClickDoctor} />
        <ESButton title="I am a Patient" customClick={onClickPatient} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
