import React, { useState, useContext } from "react";
import { View } from "react-native";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ESIcon from "./ESIcon";
import ESValueWithLabel from "./ESValueWithLabel";

const ESDatePicker = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const store = useContext(ESContext);
  const withTime = props.withTime;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let onChange = props.onChange;
    onChange & onChange(date != null ? date.getTime() : null);
    hideDatePicker();
  };

  const value = props.value;
  const placeholder =
    value != null
      ? withTime
        ? store.convertDateIntToStringWithTime(value)
        : store.convertDateIntToString(value)
      : "Choose Date";

  return (
    <View
      style={[
        props.isRowItem && styles.rowitems,
        props.withMarginRight && styles.withMarginRight,
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
        mode={withTime ? "datetime" : "date"}
        date={value != null ? new Date(value) : new Date()}
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
