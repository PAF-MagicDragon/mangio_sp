import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  useWindowDimensions,
} from "react-native";
import ESSingleLabelValue from "../components/ESSingleLabelValue";
import ESButton from "../components/ESButton";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";
import ESValueWithLabel from "../components/ESValueWithLabel";
import ESListView from "../components/ESListView";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";

const ViewPdf = ({ navigation, route }) => {
  let [qrVal, setQrVal] = useState(null);

  const store = useContext(ESContext);
  const qrObj = route.params;

  let qrRef;

  useEffect(() => {
    let qrString = store.createQrString(
      qrObj.doctor,
      qrObj.prescription,
      qrObj.patient,
      qrObj.list
    );
    setQrVal(qrString);
  }, []);

  const savePDF = () => {
    qrRef.toDataURL((val) => {
      let qrImage = val;
      let pdfString = store.createHtmlString(
        qrObj.doctor,
        qrObj.prescription,
        qrObj.patient,
        qrObj.list,
        qrImage
      );
      store.createPDF(pdfString);
    });
  };

  const saveQrCode = () => {
    let fileName = "Expresscript_QR_" + new Date().getTime();
    try {
      qrRef.toDataURL((data) => {
        let filePath =
          RNFetchBlob.fs.dirs.DownloadDir + "/" + fileName + ".png";
        RNFetchBlob.fs
          .writeFile(filePath, data, "base64")
          .then((response) => {
            console.log("Success Log:", response);
            // alert("File saved to: " + filePath);
            alert("File saved to: Downloads/" + fileName);
          })
          .catch((errors) => {
            console.log("Error Log:", errors);
          });
      });
    } catch (error) {
      console.log("Failed to generate QR", error.message);
    }
  };
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        {/* </KeyboardAvoidingView>
          </ScrollView> */}
        {qrVal && (
          <View style={[styles.qrView]}>
            <QRCode
              quietZone={5}
              size={width - 50}
              style={[styles.showBorder]}
              value={qrVal}
              getRef={(c) => (qrRef = c)}
            />
          </View>
        )}
        <ESButton title="Save QR Code" customClick={() => saveQrCode()} />
        <ESButton subButton title="Save PDF" customClick={() => savePDF()} />
      </View>
    </SafeAreaView>
  );
};

export default ViewPdf;
