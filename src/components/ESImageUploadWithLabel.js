import React from "react";
import { View, TextInput } from "react-native";
import styles from "../helpers/styles";
import ESLabel from "./ESLabel";
import ESImageUpload from "./ESImageUpload";

const ESImageUploadWithLabel = (props) => {
  return (
    <View
      style={[
        props.isRowItem && styles.rowitems,
        props.withMarginRight && styles.withMarginRight,
      ]}
    >
      <ESLabel text={props.label} />
      <ESImageUpload {...props} />
    </View>
  );
};

export default ESImageUploadWithLabel;
