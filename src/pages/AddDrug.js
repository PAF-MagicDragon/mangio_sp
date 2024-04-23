import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";
import ESTextFieldWithLabel from "../components/ESTextFieldWithLabel";
import ESButton from "../components/ESButton";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";
import ESValueWithLabel from "../components/ESValueWithLabel";
import ESDropDownWithLabel from "../components/ESDropDownWithLabel";

const AddDrug = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  let [templateData, setTemplateData] = useState([]);
  const store = useContext(ESContext);
  const prescription = route.params;

  let initializeTemplateData = () => {
    store.getTemplates((list) => {
      let temp = [];
      list.forEach((x, i) => {
        let s = x.brand;
        if (x.generic != null) {
          s = s + " (" + x.generic + ") ";
        }
        if (x.formulation != null) {
          s = s + " - " + x.formulation;
        }
        temp.push({ label: s, value: s });
      });
      setTemplateData(temp);
    });
  };

  useEffect(() => {
    setRequest({
      prescriptionId: prescription.id,
    });
    initializeTemplateData();
  }, []);

  let addEditDrug = () => {
    store.addEditEsDrug(request, (results) => {
      console.log("Results", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Drug Added",
          [
            {
              text: "Ok",
              onPress: () => {
                navigation.pop();
              },
            },
          ],
          { cancelable: false }
        );
      } else alert("Drug Add Failed");
    });
  };

  let onChange = (val, obj, field) => {
    obj[field] = val;
    setRequest((request) => ({
      ...request,
      ...obj,
    }));
  };

  return (
    request && (
      <SafeAreaView style={styles.viewMain}>
        <View style={styles.viewSub}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardAvoid}
            >
              <ESDropDownWithLabel
                label="Drug"
                placeholder="Choose One"
                data={templateData}
                // data={[
                //   { label: "Item 1", value: "1" },
                //   { label: "Item 2", value: "2" },
                //   { label: "Item 3", value: "3" },
                //   { label: "Item 4", value: "4" },
                //   { label: "Item 5", value: "5" },
                //   { label: "Item 6", value: "6" },
                //   { label: "Item 7", value: "7" },
                //   { label: "Item 8", value: "8" },
                // ]}
              />
              <ESButton title="Submit" customClick={addEditDrug} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default AddDrug;
