import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";
import styles from "../helpers/styles";

const ESIcon = (props) => {
  const name = props.name;
  return (
    <Icon
      //name={Platform.OS === "ios" ? "ios-" + { name } : "md-" + { name }}
      name={"add-circle-outline"}
      color="#1e90ff"
      size={25}
      onPress={props.customClick}
    />
  );
};

export default ESIcon;
