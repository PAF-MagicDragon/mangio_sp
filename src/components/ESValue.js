import React from "react";
import { Text, View } from "react-native";
import styles from "../helpers/styles";

const ESLabel = (props) => {
  return (
    <View
      style={[
        props.isRowItem && styles.rowitems,
        props.withMargin && styles.withMargin,
      ]}
    >
      <Text style={props.customStyle ? props.customStyle : styles.value}>
        {props.text}
      </Text>
    </View>
  );
};

export default ESLabel;
