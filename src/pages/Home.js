import React, { useEffect, useContext } from "react";
import { View, Text, SafeAreaView } from "react-native";
import ESButton from "../components/ESButton";
import ESLabel from "../components/ESLabel";
import styles from "../helpers/styles";
import ESContext from "../ESContext";

const Home = ({ navigation }) => {
  const store = useContext(ESContext);
  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        <ESButton
          subButton
          title="I am a Doctor"
          customClick={() => navigation.navigate("DoctorDashboard")}
        />
        <ESButton
          title="I am a Patient"
          customClick={() => navigation.navigate("PatientDashboard")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
