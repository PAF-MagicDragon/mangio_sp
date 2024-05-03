import React from "react";
import { Text, View } from "react-native";
import styles from "../helpers/styles";

const ESSingleLabelValue = (props) => {
  const defaultStyle1 = [
    styles.value,
    styles.withMarginRight,
    !props.noMarginTop && styles.withMarginTop,
  ];
  const defaultStyle2 = [
    styles.label,
    !props.noMarginTop && styles.withMarginTop,
  ];
  return (
    <View
      style={[
        styles.row,
        props.isRowItem && styles.rowitems,
        props.withMarginRight && styles.withMarginRight,
      ]}
    >
      <Text style={props.customStyle1 ? props.customStyle1 : defaultStyle1}>
        {props.label}
      </Text>
      <Text style={props.customStyle2 ? props.customStyle2 : defaultStyle2}>
        {props.value}
      </Text>
    </View>
  );
};

export default ESSingleLabelValue;
