import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import styles from "../helpers/styles";

const ESIcon = (props) => {
  const name = props.name;
  const color = props.color ? props.color : "#57A4FF";
  const size = props.size ? props.size : 25;
  const style = props.style;
  return (
    <Icon
      //name={Platform.OS === "ios" ? "ios-" + { name } : "md-" + { name }}
      name={name}
      color={color}
      size={size}
      onPress={props.customClick}
      style={style}
    />
  );
};

export default ESIcon;
