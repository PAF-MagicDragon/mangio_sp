import React from "react";
import { View, TextInput } from "react-native";
import styles from "../helpers/styles";
import ESLabel from "./ESLabel";
import ESTextField from "./ESTextField";

const ESTextFieldWithLabel = (props) => {
  return (
    <View
      style={[
        props.isRowItem && styles.rowitems,
        props.withMargin && styles.withMargin,
      ]}
    >
      <ESLabel {...props} text={props.label} />
      <ESTextField {...props} placeholder={"Enter " + props.label} />
    </View>
  );
};

export default ESTextFieldWithLabel;
