import React from "react";
import { Text } from "react-native";
import styles from "../helpers/styles";

const ESLabel = (props) => {
  return (
    <Text style={props.customStyle ? props.customStyle : styles.label}>
      {props.text}
    </Text>
  );
};

export default ESLabel;
