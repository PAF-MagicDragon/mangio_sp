import React from "react";
import { Text, View } from "react-native";
import styles from "../helpers/styles";

const ESValue = (props) => {
  const defaultStyle = [
    styles.value,
    !props.noMarginTop && styles.withMarginTop,
  ];
  return (
    <View
      style={[
        props.isRowItem && styles.rowitems,
        props.withMarginRight && styles.withMarginRight,
      ]}
    >
      <Text style={props.customStyle ? props.customStyle : defaultStyle}>
        {props.text}
      </Text>
    </View>
  );
};

export default ESValue;
