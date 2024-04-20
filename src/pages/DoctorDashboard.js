import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import ESButton from "../components/ESButton";
import ESIcon from "../components/ESIcon";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import ESListView from "../components/ESListView";
import styles from "../helpers/styles";
import ESContext from "../ESContext";

const DoctorDashboard = ({ navigation }) => {
  let [patients, setPatients] = useState(null);
  const store = useContext(ESContext);
  let user = store.mainUser;

  useEffect(() => {
    store.getPatients((list) => setPatients(list));
  }, []);

  let addPatient = () => {
    console.log("FRANC NAVIGATE", navigation);
    navigation.navigate("AddPatient");
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}>
            <ESLabel text="IM A DOCTOR:" />
            <ESValue text={JSON.stringify(user)} />
            <ESLabel text="PATIENTS:" />
            <ESIcon name="add-circle-outline" customClick={addPatient} />
            <ESListView
              list={patients}
              customPanel={(item) => {
                <View>
                  <Text>Id: {item.id}</Text>
                  <Text>Name: {item.name}</Text>
                  <Text>Address: {item.address}</Text>
                  <Text>Contact: {item.contactNo}</Text>
                </View>;
              }}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDashboard;
