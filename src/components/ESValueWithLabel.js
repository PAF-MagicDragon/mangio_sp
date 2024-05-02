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
        props.withMarginRight && styles.withMarginRight,
      ]}
    >
      <ESLabel
        customStyle={props.customStyleLabel}
        noMarginTop={props.noMarginTopLabel}
        text={props.label}
      />
      <ESValue
        customStyle={props.customStyleValue}
        noMarginTop={props.noMarginTopValue}
        text={props.value}
      />
    </View>
  );
};

export default ESValueWithLabel;
