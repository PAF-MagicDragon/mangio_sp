import React, { useState } from "react";
import { View } from "react-native";
import styles from "../helpers/styles";
import { Dropdown } from "react-native-element-dropdown";

const ESDropDown = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  if (props.value != null && value == null) {
    setValue(props.value);
  }
  const data = props.data;
  const placeholder =
    props.label != null ? "Choose " + props.label : "Choose One";
  const onChange = props.onChange;
  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "#57A4FF" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      itemTextStyle={styles.itemTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? placeholder : placeholder}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        onChange && onChange(item.value);
        setIsFocus(false);
      }}
    />
  );
};

export default ESDropDown;
