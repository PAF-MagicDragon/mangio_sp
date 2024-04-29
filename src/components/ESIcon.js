import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import styles from "../helpers/styles";

const ESIcon = (props) => {
  const name = props.name;
  const color = props.color;
  return (
    <Icon
      //name={Platform.OS === "ios" ? "ios-" + { name } : "md-" + { name }}
      name={name}
      color={color ? color : "#57A4FF"}
      size={25}
      onPress={props.customClick}
    />
  );
};

export default ESIcon;
