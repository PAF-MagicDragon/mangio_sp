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
import ESValueWithLabel from "../components/ESValueWithLabel";
import ESListView from "../components/ESListView";
import styles from "../helpers/styles";
import ESContext from "../ESContext";

const DoctorDashboard = ({ navigation }) => {
  let [patients, setPatients] = useState(null);
  const store = useContext(ESContext);
  let user = store.mainUser;

  let refreshList = () => {
    store.getPatients((list) => setPatients(list));
  };

  useEffect(() => {
    refreshList();
  }, []);

  let addPatient = () => {
    navigation.navigate("AddPatient");
  };

  let viewPatient = (item) => {
    navigation.navigate("ViewPatient", item);
  };

  let deletePatient = (item) => {
    store.deletePatient(item.id, (results) => {
      console.log("Results delete patient", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Patient Deleted",
          [
            {
              text: "Ok",
              onPress: () => {
                refreshList();
              },
            },
          ],
          { cancelable: false }
        );
      } else alert("Patient Delete Failed");
    });
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        {/* <ScrollView keyboardShouldPersistTaps="handled"> */}
        {/* <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}> */}
        <ESLabel
          text={"Hello Doctor " + user.name + "!"}
          customStyle={styles.header}
        />
        <ESValue text={user.address} customStyle={styles.valueNoMargin} />
        <ESValue text={user.email} customStyle={styles.valueNoMargin} />
        <ESValue text={user.contactNo} customStyle={styles.valueNoMargin} />
        <View style={styles.withPadding}>
          <ESListView
            header="Patients"
            list={patients}
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
            customViewClick={(item) => viewPatient(item)}
            customAddClick={addPatient}
            customEditClick={(item) => alert("EDIT" + item.id)}
            customDeleteClick={(item) => deletePatient(item)}
          />
        </View>
        {/* </KeyboardAvoidingView> */}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default DoctorDashboard;
