import React from "react";
import { Text } from "react-native";
import styles from "../helpers/styles";

const ESLabel = (props) => {
  return <Text style={styles.value}>{props.text}</Text>;
};

export default ESLabel;
