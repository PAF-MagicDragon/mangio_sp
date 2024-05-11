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
import { orderBy } from "lodash";

const PatientDashboard = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  const store = useContext(ESContext);
  let user = store.mainUser;

  useEffect(() => {
    if (store.qrString != null) {
      store.saveValuesFromQr(store.qrString, user.id);
      let qrObj = JSON.parse(store.qrString);
      console.log("FRANC QR OBJ", qrObj);
      store.qrString = null;
    }
    console.log();
  }, [store.qrString]);

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
            name="Schedules"
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
        </Tab.Navigator>
        {/* </KeyboardAvoidingView>
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default PatientDashboard;
