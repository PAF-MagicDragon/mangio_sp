import React from "react";
import styles from "../helpers/styles";
import DatePicker from "react-native-date-picker";

const ESDatePicker = (props) => {
  return (
    <DatePicker
      style={styles.datePicker}
      date={props.value}
      onDateChange={props.onChange}
      mode={"date"}
    />
  );
};

export default ESDatePicker;
