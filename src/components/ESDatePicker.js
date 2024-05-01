import React, { useState } from "react";
import { View } from "react-native";
import styles from "../helpers/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ESIcon from "./ESIcon";
import ESValueWithLabel from "./ESValueWithLabel";

const ESDatePicker = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  console.log("FRANC DATE PICKER", props);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let onChange = props.onChange;
    onChange & onChange(date);
    hideDatePicker();
  };

  const placeholder =
    props.value != null ? props.value.toLocaleDateString() : "Choose Date";

  console.log("FRANC DATE PLACEHOLDER", placeholder);
  return (
    <View
      style={[
        props.isRowItem && styles.rowitems,
        props.withMargin && styles.withMargin,
      ]}
    >
      <View style={styles.row}>
        <ESValueWithLabel
          label={props.label}
          value={placeholder}
          customStyleValue={styles.datePickerValue}
          isRowItem
        />
        <View style={styles.datePickerIcon}>
          <ESIcon name="calendar-outline" customClick={showDatePicker} />
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={props.value}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );

  // return (
  //   <DatePicker
  //     style={styles.datePicker}
  //     date={props.value}
  //     onDateChange={props.onChange}
  //     mode={"date"}
  //   />
  // );
};

export default ESDatePicker;
