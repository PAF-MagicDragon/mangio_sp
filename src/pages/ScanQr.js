import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView } from "react-native";

import styles from "../helpers/styles";
import ESContext from "../ESContext";
import ESQrScan from "../components/ESQrScan";

const ScanQr = ({ navigation, route }) => {
  const store = useContext(ESContext);
  // let user = store.mainUser;

  // let goBack = () => {
  //   navigation.pop();
  // };

  let onChange = (val) => {
    navigation.replace("InputStartTime", val);
    //store.saveValuesFromQr(val, user.id, setTimeout(goBack, 1000)); //add delay since saving of schedule is async. needs to save before going back
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <ESQrScan
        onChange={onChange}
        topText="Patient QR Code"
        bottomText="Scan to generate schedule"
      />
    </SafeAreaView>
  );
};

export default ScanQr;
