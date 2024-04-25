import React from "react";
import { View, TextInput } from "react-native";
import styles from "../helpers/styles";
import ESLabel from "./ESLabel";
import ESValue from "./ESValue";

const ESValueWithLabel = (props) => {
  return (
    <View
      style={[
        props.isRowItem && styles.rowitems,
        props.withMargin && styles.withMargin,
      ]}
    >
      <ESLabel {...props} text={props.label} />
      <ESValue {...props} text={props.value} />
    </View>
  );
};

export default ESValueWithLabel;
