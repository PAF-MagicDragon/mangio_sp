import React, { useEffect, useContext } from "react";
import { View, Text, SafeAreaView } from "react-native";
import ESButton from "../components/ESButton";
import ESLabel from "../components/ESLabel";
import styles from "../helpers/styles";
import ESContext from "../ESContext";

const PatientDashboard = ({ navigation }) => {
  const store = useContext(ESContext);
  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        <ESLabel text="Patient Dashboard" />
      </View>
    </SafeAreaView>
  );
};

export default PatientDashboard;
