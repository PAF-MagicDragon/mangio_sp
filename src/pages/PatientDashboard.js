import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ESSingleLabelValue from "../components/ESSingleLabelValue";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";
import ESListView from "../components/ESListView";
import ESButton from "../components/ESButton";
import ESIcon from "../components/ESIcon";
import PatientDashboard1 from "./PatientDashboard1";
import PatientDashboard2 from "./PatientDashboard2";
import PatientDashboard3 from "./PatientDashboard3";

const PatientDashboard = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  const store = useContext(ESContext);
  let user = store.mainUser;

  let onScanQr = () => {
    let PLSDELETESTRING =
      '{"a":"|d040968e-5891-4526-ab83-affda0903aa3|franc mangio","b":"|1715014495572|urinary tract infection|1|2","c":"|fatima gopez mangio","d":["|Biogesic (B1)  - tablet|200|300|1|1|1|1|1|2|drink before meals","|Bonamine (B2)  - syrup|20|30|1|2|1|2|10|1|the quick brown fox jumps over the lazy dog"]}';
    store.saveValuesFromQr(PLSDELETESTRING, user.id);
    navigation.navigate("ScanQr");
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        {/* <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}> */}
        <ESLabel
          text={"Hello Patient " + user.name + "!"}
          customStyle={[styles.header, styles.withPadding]}
        />
        <ESValue text={user.address} customStyle={styles.valueNoMargin} />
        <ESValue text={user.email} customStyle={styles.valueNoMargin} />
        <ESValue text={user.contactNo} customStyle={styles.valueNoMargin} />
        <View style={styles.row}>
          <ESSingleLabelValue
            label="Gender"
            value={store.getLabelFromValue(user.gender, constants.LIST_GENDER)}
            noMarginTopValue
            isRowItem
            withMarginRight
          />
          <ESSingleLabelValue
            label="Age"
            value={store.getAgeFromBday(user.bday)}
            noMarginTopValue
            isRowItem
            withMarginRight
          />
          <ESIcon
            name="qr-code-outline"
            size={50}
            color="#000000"
            customClick={() => onScanQr()}
          />
        </View>
        <Tab.Navigator
          initialRouteName="Schedules"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <ESIcon name="alarm-outline" color={color} size={size} />
              ),
            }}
            name="Pending"
            component={PatientDashboard1}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <ESIcon name="medkit-outline" color={color} size={size} />
              ),
            }}
            name="Prescriptions"
            component={PatientDashboard2}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color, size }) => (
                <ESIcon name="time-outline" color={color} size={size} />
              ),
            }}
            name="Completed"
            component={PatientDashboard3}
          />
        </Tab.Navigator>
        {/* </KeyboardAvoidingView>
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default PatientDashboard;
