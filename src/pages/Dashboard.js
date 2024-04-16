import React, { useEffect, useContext } from "react";
import { View, SafeAreaView } from "react-native";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "./Profile";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";
import * as constants from "../helpers/constants";
// const Tab = createBottomTabNavigator();

const Dashboard = ({ navigation }) => {
  const store = useContext(ESContext);
  let type = store.mainUser.type;
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    isFocused && (
      <SafeAreaView style={styles.viewMain}>
        <View style={styles.viewSub}>
          {/* <Tab.Navigator>
          <Tab.Screen name="DoctorDashboard" component={DoctorDashboard} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator> */}
          {type == constants.TYPE_MAIN_DOCTOR ? (
            <DoctorDashboard />
          ) : (
            <PatientDashboard />
          )}
        </View>
      </SafeAreaView>
    )
  );
};

export default Dashboard;
