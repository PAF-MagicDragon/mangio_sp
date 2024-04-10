import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../helpers/styles";

const ESButton = (props) => {
  return (
    <TouchableOpacity
      style={props.subButton ? styles.button2 : styles.button1}
      onPress={props.customClick}
    >
      <Text style={props.subButton ? styles.buttonLabel2 : styles.buttonLabel1}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default ESButton;
