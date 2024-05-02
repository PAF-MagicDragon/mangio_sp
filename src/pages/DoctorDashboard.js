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
                  <ESValue
                    text={item.address}
                    customStyle={styles.valueNoMargin}
                  />
                  <View style={styles.row}>
                    <ESValue
                      text={item.contactNo}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                      withMarginRight
                    />
                    <ESValue
                      text={item.email}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                    />
                  </View>
                  <View style={styles.row}>
                    <ESValue
                      text={store.getLabelFromValue(
                        item.gender,
                        constants.LIST_GENDER
                      )}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                      withMarginRight
                    />
                    <ESValue
                      text={store.convertDateIntToString(item.bday)}
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
