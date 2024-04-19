import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import styles from "../helpers/styles";
import RadioForm from "react-native-simple-radio-button";

const ESRadio = (props) => {
  let initial = -1;
  if (props.options != null) {
    props.options.forEach((x, i) => {
      console.log("FRANC ES RADIO", x, i, props.value);
      if (x.value == props.value) {
        initial = i;
      }
    });
  }
  console.log("FRANC ES RADIO INITIAL", initial);
  return (
    <View style={styles.radio}>
      <RadioForm
        radio_props={props.options}
        initial={initial}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={"#1e90ff"}
        selectedButtonColor={"#1e90ff"}
        labelColor={"#1e90ff"}
        selectedLabelColor={"#1e90ff"}
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
