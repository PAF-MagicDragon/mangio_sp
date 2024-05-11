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

const PatientDashboard2 = ({ navigation }) => {
  let [prescriptions, setPrescriptions] = useState(null);
  const store = useContext(ESContext);
  let user = store.mainUser;

  let refreshList = () => {
    // store.getPatients((list) => setPatients(list));
    setPrescriptions([]);
  };

  useEffect(() => {
    refreshList();
  }, [store.qrString]);

  let onScanQr = () => {
    store.qrString =
      '{"a":"|d040968e-5891-4526-ab83-affda0903aa3|franc mangio","b":"|1715014495572|urinary tract infection|1|2","c":"|fatima gopez mangio","d":["|Biogesic (B1)  - tablet|200|300|1|1|1|1|1|2|drink before meals","|Bonamine (B2)  - syrup|20|30|1|2|1|2|10|1|the quick brown fox jumps over the lazy dog"]}';
    navigation.navigate("ScanQr");
  };

  return (
    <View style={styles.viewMain}>
      <View style={styles.withPadding}>
        <ESListView
          header="Prescriptions"
          list={prescriptions}
          customPanel={(item) => {
            return (
              <View>
                <ESLabel
                  text={"SAMPLE SCHEDULE"}
                  customStyle={styles.subHeader}
                />
              </View>
            );
          }}
          // customViewClick={(item) => viewPatient(item)}
          // customAddClick={() => addEditPatient()}
          // customEditClick={(item) => addEditPatient(item)}
          // customDeleteClick={(item) =>
          //   store.confirm(
          //     () => deletePatient(item),
          //     "Confirm",
          //     "Are you sure you want to delete this patient?"
          //   )
          // }
        />
      </View>
      <View style={styles.bottomContainer}>
        {/* <ESButton title="SCAN QR CODE" customClick={() => onScanQr()} /> */}
        <ESIcon
          name="qr-code-outline"
          size={50}
          color="#000000"
          customClick={() => onScanQr()}
        />
      </View>
    </View>
  );
};

export default PatientDashboard2;
