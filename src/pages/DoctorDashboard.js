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
import ESSingleLabelValue from "../components/ESSingleLabelValue";
import ESListView from "../components/ESListView";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";

const DoctorDashboard = ({ navigation }) => {
  let [patients, setPatients] = useState(null);
  const store = useContext(ESContext);
  let user = store.mainUser;

  let refreshList = () => {
    store.getPatients((list) => setPatients(list));
  };

  useEffect(() => {
    refreshList();
    navigation.setOptions({
      headerRight: () => (
        <ESIcon
          name="settings-outline"
          color="#ffffff"
          customClick={() => navigation.navigate("Profile")}
        />
      ),
    });
  }, []);

  let addEditPatient = (item) => {
    navigation.navigate("AddPatient", item);
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
          customStyle={[styles.header, styles.withPadding]}
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
                  <ESLabel text={item.name} customStyle={styles.subHeader} />
                  <ESSingleLabelValue
                    label="Address"
                    value={item.address}
                    customStyle={styles.valueNoMargin}
                  />
                  <ESSingleLabelValue
                    label="Contact No"
                    value={item.contactNo}
                    customStyle={styles.valueNoMargin}
                  />
                  <ESSingleLabelValue
                    label="Email"
                    value={item.email}
                    customStyle={styles.valueNoMargin}
                  />
                  <View style={styles.row}>
                    <ESSingleLabelValue
                      label="Gender"
                      value={store.getLabelFromValue(
                        item.gender,
                        constants.LIST_GENDER
                      )}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                      withMarginRight
                    />
                    <ESSingleLabelValue
                      label="Birthday"
                      value={store.convertDateIntToString(item.bday)}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                    />
                  </View>
                </View>
              );
            }}
            customViewClick={(item) => viewPatient(item)}
            customAddClick={() => addEditPatient()}
            customEditClick={(item) => addEditPatient(item)}
            customDeleteClick={(item) =>
              store.confirm(
                () => deletePatient(item),
                "Confirm",
                "Are you sure you want to delete this patient?"
              )
            }
          />
        </View>
        {/* </KeyboardAvoidingView> */}
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default DoctorDashboard;
