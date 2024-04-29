import React from "react";
import { View, TextInput } from "react-native";
import styles from "../helpers/styles";

const ESTextField = (props) => {
  return (
    <View style={props.multiline ? styles.textFieldMulti : styles.textField}>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#57A4FF"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
        maxLength={props.maxLength}
      />
    </View>
  );
};

export default ESTextField;
