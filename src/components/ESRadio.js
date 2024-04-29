import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import styles from "../helpers/styles";
import RadioForm from "react-native-simple-radio-button";

const ESRadio = (props) => {
  let initial = -1;
  if (props.options != null) {
    props.options.forEach((x, i) => {
      if (x.value == props.value) {
        initial = i;
      }
    });
  }
  return (
    <View style={props.customStyle ? props.customStyle : styles.radio}>
      <RadioForm
        radio_props={props.options}
        initial={initial}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={"#57A4FF"}
        selectedButtonColor={"#57A4FF"}
        labelColor={"#000000"}
        selectedLabelColor={"#000000"}
        animation={false}
        onPress={(val) => {
          const onChange = props.onChange;
          onChange && onChange(val);
        }}
        labelStyle={styles.radioLabelStyle}
      />
    </View>
  );
};

export default ESRadio;
