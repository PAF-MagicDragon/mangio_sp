import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  useWindowDimensions,
} from "react-native";
import ESTextFieldWithLabel from "../components/ESTextFieldWithLabel";
import ESButton from "../components/ESButton";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";
import ESDatePicker from "../components/ESDatePicker";
import ESListView from "../components/ESListView";
import ESLabel from "../components/ESLabel";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import cloneDeep from "lodash/cloneDeep";
import QRCode from "react-native-qrcode-svg";

const InputStartTime = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  const store = useContext(ESContext);
  let user = store.mainUser;
  const val = route.params;

  useEffect(() => {
    setRequest({
      startDate: new Date().getTime(),
    });
  }, []);

  let goBack = () => {
    navigation.pop();
  };

  let submitTime = () => {
    if (request.startDate == null) {
      alert("Start Date/Time is required");
      return;
    }
    store.saveValuesFromQr(
      val,
      request.startDate,
      user.id,
      setTimeout(goBack, 1000)
    ); //add delay since saving of schedule is async. needs to save before going back
  };

  let onChange = (val, obj, field) => {
    obj[field] = val;
    setRequest((request) => ({
      ...request,
      ...obj,
    }));
  };
  const { width } = useWindowDimensions();
  return (
    request && (
      <SafeAreaView style={styles.viewMain}>
        <View style={styles.viewSub}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardAvoid}
            >
              {val && (
                <View style={[styles.qrView]}>
                  <QRCode
                    quietZone={5}
                    size={width - 50}
                    style={[styles.showBorder]}
                    value={val}
                    getRef={(c) => (qrRef = c)}
                  />
                </View>
              )}
              <View style={styles.inputStartTime}>
                <ESDatePicker
                  label="Start Date/Time"
                  value={request.startDate}
                  onChange={(val) => onChange(val, request, "startDate")}
                  withTime
                />
                <View style={styles.withPadding}>
                  <ESButton title="Submit" customClick={submitTime} />
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default InputStartTime;
