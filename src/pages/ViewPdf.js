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
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
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

  // const saveQrCode = () => {
  //   let fileName = "Expresscript_QR_" + new Date().getTime();
  //   console.log("FILE PATH 1", RNFS.CachesDirectoryPath);
  //   console.log("FILE PATH 2", RNFS.DocumentDirectoryPath);
  //   let basePath =
  //     "/storage/emulated/0/Android/data/com.sample/files/Downloads/"; //RNFS.CachesDirectoryPath + "/";
  //   let fullPath = basePath + fileName;
  //   qrRef.toDataURL((data) => {
  //     RNFS.writeFile(fullPath, data, "base64")
  //       .then((success) => {
  //         //          return CameraRoll.saveToCameraRoll(fullPath, "photo");
  //         alert(CameraRoll.saveToCameraRoll(fullPath, "photo"));
  //       })
  //       .catch((err) => {
  //         console.log("FRANC FILE ERROR", err.message);
  //       });
  //   });
  // };
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        {/* </KeyboardAvoidingView>
          </ScrollView> */}
        {qrVal && (
          <View style={[styles.qrView]}>
            <QRCode
              size={width - 50}
              style={[styles.showBorder]}
              value={qrVal}
              getRef={(c) => (qrRef = c)}
            />
          </View>
        )}
        <ESButton subButton title="Save PDF" customClick={() => savePDF()} />
        {/* <ESButton title="Save QR Code" customClick={() => saveQrCode()} /> */}
      </View>
    </SafeAreaView>
  );
};

export default ViewPdf;
