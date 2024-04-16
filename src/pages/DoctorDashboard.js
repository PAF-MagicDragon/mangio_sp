import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import ESButton from "../components/ESButton";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const DoctorDashboard = ({ navigation }) => {
  const store = useContext(ESContext);
  let user = store.mainUser;
  const isFocused = useIsFocused();

  useEffect(() => {
    //FOR RECODE USE CB FOR ASYNC

    console.log("DASHBOARD USER:", user);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log("DASHBOARD FRANC:", user);
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
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardAvoid}
            >
              <ESLabel text="Counter:" />
              <ESValue text={store.updateCounter} />

              <ESLabel text="Name:" />
              <ESValue text={user.name} />

              <ESLabel text="Address:" />
              <ESValue text={user.address} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default DoctorDashboard;
