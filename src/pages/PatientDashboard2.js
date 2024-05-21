import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import ESSingleLabelValue from "../components/ESSingleLabelValue";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";
import ESListView from "../components/ESListView";
import ESButton from "../components/ESButton";
import ESIcon from "../components/ESIcon";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const PatientDashboard2 = ({ navigation }) => {
  let [prescriptions, setPrescriptions] = useState(null);
  const store = useContext(ESContext);
  let user = store.mainUser;

  let refreshList = () => {
    console.log("REFRESH LIST 2");
    store.getPrescriptions(null, user.id, true, (list) =>
      setPrescriptions(list)
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshList();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  let viewPrescription = (item) => {
    navigation.navigate("ViewPrescription", { item: item, withEdit: true });
  };

  let deletePrescription = (item) => {
    store.deletePrescription(item.id, true, (results) => {
      console.log("Results delete prescription", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Prescription Deleted",
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
      } else alert("Prescription Delete Failed");
    });
  };

  return (
    <View style={[styles.viewMain, styles.tabContainer]}>
      <View style={styles.withPadding}>
        <ESListView
          header="Prescriptions"
          list={prescriptions}
          customPanel={(item) => {
            return (
              <View>
                <ESLabel
                  text={store.convertDateIntToStringWithTime(item.createDate)}
                  customStyle={styles.subHeader}
                  isRowItem
                  withMarginRight
                />
                <ESSingleLabelValue
                  label="Doctor"
                  value={item.doctorName}
                  customStyle={styles.valueNoMargin}
                />
                <ESSingleLabelValue
                  label="Diagnosis"
                  value={item.diagnosis}
                  customStyle={styles.valueNoMargin}
                />
                <ESSingleLabelValue
                  label="Notes"
                  value={item.notes}
                  customStyle={styles.valueNoMargin}
                />
                <View style={styles.row}>
                  <ESSingleLabelValue
                    label="Height"
                    value={item.height + " cm"}
                    customStyle={styles.valueNoMargin}
                    isRowItem
                    withMarginRight
                  />
                  <ESSingleLabelValue
                    label="Weight"
                    value={item.weight + " kg"}
                    customStyle={styles.valueNoMargin}
                    isRowItem
                  />
                </View>
              </View>
            );
          }}
          customViewClick={(item) => viewPrescription(item)}
          customDeleteClick={(item) =>
            store.confirm(
              () => deletePrescription(item),
              "Confirm",
              "Are you sure you want to delete this prescription?"
            )
          }
        />
      </View>
    </View>
  );
};

export default PatientDashboard2;
