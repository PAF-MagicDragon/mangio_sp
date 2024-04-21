import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";
import ESTextFieldWithLabel from "../components/ESTextFieldWithLabel";
import ESButton from "../components/ESButton";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import ESListView from "../components/ESListView";
import * as constants from "../helpers/constants";
import ESRadioWithLabel from "../components/ESRadioWithLabel";

const ViewPatient = ({ navigation, route }) => {
  let [prescriptions, setPrescriptions] = useState(null);
  const store = useContext(ESContext);
  const patient = route.params;
  useEffect(() => {
    store.getPrescriptions((list) => setPrescriptions(list));
  }, []);

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        {/* <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}> */}
        <ESLabel text="SELECTED PATIENT:" />
        <ESValue text={JSON.stringify(patient)} />
        {/* </KeyboardAvoidingView>
        </ScrollView> */}
        <ESListView
          header="Prescriptions"
          list={prescriptions}
          customPanel={(item) => {
            return (
              <View>
                <Text>Id: {item.id}</Text>
                <Text>Name: {item.name}</Text>
                <Text>Address: {item.address}</Text>
                <Text>Contact: {item.contactNo}</Text>
              </View>
            );
          }}
          customViewClick={(item) => alert("VIEW" + item)}
          customAddClick={() => alert("ADD")}
          customEditClick={(item) => alert("EDIT" + item.id)}
          customDeleteClick={(item) => alert("DELETE" + item.id)}
          customActionClick={(item) => alert("PRINT" + item.id)}
          customActionIcon="print-outline"
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewPatient;
