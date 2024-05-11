import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView } from "react-native";

import styles from "../helpers/styles";
import ESContext from "../ESContext";
import ESQrScan from "../components/ESQrScan";

const ScanQr = ({ navigation, route }) => {
  const store = useContext(ESContext);

  let onChange = (val) => {
    console.log("FRANC QR VAL", val);
    store.qrString = val;
    navigation.pop();
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
