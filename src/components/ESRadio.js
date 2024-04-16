import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import styles from "../helpers/styles";
import RadioForm from "react-native-simple-radio-button";

const ESRadio = (props) => {
  console.log("FRANC ES RADIO", props.value);
  return (
    <View>
      <RadioForm
        radio_props={props.options}
        initial={props.value}
        onPress={(val) => {
          const onChange = props.onChange;
          onChange && onChange(val);
        }}
      />
    </View>
  );
};

export default ESRadio;
