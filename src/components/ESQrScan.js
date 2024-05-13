import React from "react";
import styles from "../helpers/styles";

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import ESLabel from "./ESLabel";
import ESValue from "./ESValue";

const ESQrScan = (props) => {
  const onChange = props.onChange;

  onSuccess = (e) => {
    onChange && onChange(e.data);
  };

  let topText = props.topText;
  let bottomText = props.bottomText;
  return (
    <QRCodeScanner
      onRead={this.onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={topText && <ESLabel text={topText} />}
      bottomContent={bottomText && <ESValue text={bottomText} />}
    />
  );
};

export default ESQrScan;
