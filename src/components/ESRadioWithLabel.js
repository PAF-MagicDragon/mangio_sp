import React from "react";
import { View, TextInput } from "react-native";
import styles from "../helpers/styles";
import ESLabel from "./ESLabel";
import ESRadio from "./ESRadio";

const ESRadioWithLabel = (props) => {
  return (
    <View
      style={props.withMargin ? styles.rowitemsWithMargin : styles.rowitems}
    >
      <ESLabel {...props} text={props.label} />
      <ESRadio {...props} />
    </View>
  );
};

export default ESRadioWithLabel;
