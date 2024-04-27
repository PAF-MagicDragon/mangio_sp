import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  Platform,
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
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import QRCode from "react-native-qrcode-svg";

const ViewPatient = ({ navigation, route }) => {
  let [prescriptions, setPrescriptions] = useState(null);
  const store = useContext(ESContext);
  const patient = route.params;
  const isFocused = useIsFocused();

  let refMap = [];

  let refreshList = () => {
    store.getPrescriptions(store.mainUser.id, patient.id, (list) =>
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

  // useEffect(() => {
  //   refreshList();
  // }, []);

  let addPrescription = (item) => {
    navigation.navigate("AddPrescription", item);
  };

  let viewPrescription = (item) => {
    navigation.navigate("ViewPrescription", item);
  };

  let deletePrescription = (item) => {
    store.deletePrescription(item.id, (results) => {
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

  const createPDF = async (string, id) => {
    let myHtml = string;
    console.log("FRANC HTML", myHtml);
    try {
      let PDFOptions = {
        html: myHtml,
        fileName: "Expresscript" + id,
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      alert(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error.message);
    }
  };

  const printPDF = (item) => {
    refMap[item.id].toDataURL((val) => {
      console.log("FRANC BASE64", val);
      let qrImage = val;
      let pdfString =
        "<style>body{font-family:Helvetica;font-size:12px}footer,header{height:50px;background-color:#fff;color:#000;display:flex;justify-content:center;padding:0 20px}table{width:100%;border-collapse:collapse}td,th{border:1px solid #000;padding:5px}th{background-color:#ccc}</style><header><h1>Invoice for Order #12341234</h1></header><img alt='Red dot'src='data:image/png;base64," +
        qrImage +
        "'><h1>Order Details</h1><table><tr><th>Order ID<td>12341234}<tr><th>Order Date<td>29-Jul-2022<tr><th>Order Status<td>Completed<tr><th>Order Total<td>$13232</table><h1>Order Lines</h1><table><tr><th>Product ID<th>Product Name<th>Product Qty<th>Product Price<tr><td>1a<td>2a<td>3a<td>4a<tr><td>1b<td>2b<td>3b<td>4b<tr><td>1c<td>2c<td>3c<td>4c</table><footer><p>Thank you for your business!</footer>";
      createPDF(pdfString, item.id);
    });
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        {/* <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}> */}
        <ESLabel text="SELECTED PATIENT:" />
        <ESValue text={JSON.stringify(patient)} />

        <ESListView
          header="Prescriptions"
          list={prescriptions}
          customPanel={(item) => {
            let dateString = new Date(item.createDate).toLocaleString("en-GB", {
              hour12: false,
            });
            return (
              <View>
                <Text>Id: {item.id}</Text>
                <Text>Date: {item.createDate}</Text>
                <Text>Date 2: {dateString}</Text>
                <Text>Diagnosis: {item.diagnosis}</Text>
                <View style={{ opacity: 0, height: 0 }}>
                  <QRCode
                    value={item.id}
                    getRef={(c) => (refMap[item.id] = c)}
                  />
                </View>
              </View>
            );
          }}
          customViewClick={(item) => viewPrescription(item)}
          customAddClick={() => addPrescription(patient)}
          customEditClick={(item) => alert("EDIT" + item.id)}
          customDeleteClick={(item) => deletePrescription(item)}
          customActionClick={(item) => printPDF(item)}
          customActionIcon="print-outline"
        />
        {/* </KeyboardAvoidingView>
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default ViewPatient;
