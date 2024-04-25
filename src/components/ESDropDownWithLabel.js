import React from "react";
import { View, TextInput } from "react-native";
import styles from "../helpers/styles";
import ESLabel from "./ESLabel";
import ESDropDown from "./ESDropDown";

const ESDropDownWithLabel = (props) => {
  return (
    <View
      style={[
        props.isRowItem && styles.rowitems,
        props.withMargin && styles.withMargin,
      ]}
    >
      <ESLabel {...props} text={props.label} />
      <ESDropDown {...props} />
    </View>
  );
};

export default ESDropDownWithLabel;
