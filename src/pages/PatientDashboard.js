import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Platform,
  PermissionsAndroid,
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
import PushNotification from "react-native-push-notification";

const PatientDashboard = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  const store = useContext(ESContext);
  let user = store.mainUser;

  let onScanQr = () => {
    // let PLSDELETESTRING =
    //   '{"a":"|36bc0283-4da1-48b8-a72e-7f7786853f51|Franc Mangio","b":"|1715906867931|diagnosis|notes|22|33","c":"|nash mangio","d":["|Advil (Ibuprofen)  - capsule|100mg|2|8|1|5|2|1|take your medicine on time|3"]}';
    // navigation.navigate("InputStartTime", PLSDELETESTRING);
    navigation.navigate("ScanQr");
  };

  let cancelAlarms = () => {
    PushNotification.cancelAllLocalNotifications();
    Alert.alert(
      "Success",
      "Alarms Cancelled",
      [
        {
          text: "Ok",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        PermissionsAndroid.check("android.permission.POST_NOTIFICATIONS")
          .then((response) => {
            if (!response) {
              PermissionsAndroid.request(
                "android.permission.POST_NOTIFICATIONS",
                {
                  title: "Notification",
                  message:
                    "App needs access to your notification " +
                    "so you can get Updates",
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK",
                }
              );
            }
          })
          .catch((err) => {
            console.log("Notification Error=====>", err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.row}>
          <ESIcon
            name="volume-mute-outline"
            color="#ffffff"
            customClick={() =>
              store.confirm(
                () => cancelAlarms(),
                "Confirm",
                "Are you sure you want to cancel all alarms?"
              )
            }
            style={styles.withMarginRight}
          />
          <ESIcon
            name="settings-outline"
            color="#ffffff"
            customClick={() => navigation.navigate("Profile")}
          />
        </View>
      ),
    });
  }, []);

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
          sceneContainerStyle={styles.defaultBackground}
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
