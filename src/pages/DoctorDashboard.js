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

const DoctorDashboard = ({ navigation }) => {
  const store = useContext(ESContext);
  let user = store.mainUser;

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}>
            <ESLabel text="IM A DOCTOR:" />
            <ESValue text={JSON.stringify(user)} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDashboard;
