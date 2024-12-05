import React, { useState, useEffect, useContext } from "react";
import {
  View,
  // ScrollView,
  // KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  // Text,
  useWindowDimensions,
} from "react-native";
// import ESSingleLabelValue from "../components/ESSingleLabelValue";
import ESButton from "../components/ESButton";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
// import * as constants from "../helpers/constants";
// import ESValueWithLabel from "../components/ESValueWithLabel";
// import ESListView from "../components/ESListView";
// import ESLabel from "../components/ESLabel";
// import ESValue from "../components/ESValue";
// import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
// import RNFS from "react-native-fs";
// import RNFetchBlob from "rn-fetch-blob";
import * as FileSystem from 'expo-file-system';
const { StorageAccessFramework } = FileSystem;
// import * as MediaLibrary from 'expo-media-library';


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

  const saveQrCode = async () => {
    try {
      // Request permissions first
      // const { status } = await MediaLibrary.requestPermissionsAsync();
      // if (status !== 'granted') {
      //   Alert.alert('Permission needed', 'Please grant permission to save files');
      //   return;
      // }
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        Alert.alert('Permission needed', 'Failed to save QR Code. Please grant permission to save files');
        return;
      }

      // const fileName = "Expresscript_QR_" + new Date().getTime() + ".png";
      // const fileUri = `${FileSystem.d}${fileName}`;


      // await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'image/png')
      //     .then(async(uri) => {
      //         await FileSystem.writeAsStringAsync(uri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
      //     })
      //     .catch((e) => {
      //         console.log(e);
      //     });


      // Convert QR code to base64 and save
      qrRef.toDataURL(async (qrData) => {
        const fileName = "Expresscript_QR_" + new Date().getTime() + ".png";
        // const fileUri = `${FileSystem.d}${fileName}`;
  
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'image/png')
            .then(async(uri) => {
                await FileSystem.writeAsStringAsync(uri, qrData, { encoding: FileSystem.EncodingType.Base64 });
            })
            .catch((e) => {
                console.log(e);
            });
         
        // try {
        //   await FileSystem.writeAsStringAsync(fileUri, data, {
        //     encoding: FileSystem.EncodingType.Base64,
        //   });

        //   // Save to media library
        //   // const asset = await MediaLibrary.createAssetAsync(fileUri);
        //   // await MediaLibrary.createAlbumAsync('ExpressScript', asset, false);

        //   Alert.alert('Success', 'QR Code saved to your photos');
        // } catch (error) {
        //   console.error('Error saving file:', error);
        //   Alert.alert('Error', 'Failed to save QR Code');
        // }
      });
    
    } catch (error) {
      console.error('Failed to save QR:', error);
      Alert.alert('Error', 'Failed to save QR Code');
    }


  //   try {
  //     await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
  //         .then(async(uri) => {
  //             await FileSystem.writeAsStringAsync(uri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
  //         })
  //         .catch((e) => {
  //             console.log(e);
  //         });
  // } catch (e) {
  //     throw new Error(e);
  // }










    // let fileName = "Expresscript_QR_" + new Date().getTime();
    // try {
    //   qrRef.toDataURL((data) => {
    //     let filePath =
    //       RNFetchBlob.fs.dirs.DownloadDir + "/" + fileName + ".png";
    //     RNFetchBlob.fs
    //       .writeFile(filePath, data, "base64")
    //       .then((response) => {
    //         console.log("Success Log:", response);
    //         // alert("File saved to: " + filePath);
    //         alert("File saved to: Downloads/" + fileName);
    //       })
    //       .catch((errors) => {
    //         console.log("Error Log:", errors);
    //       });
    //   });
    // } catch (error) {
    //   console.log("Failed to generate QR", error.message);
    // }


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
