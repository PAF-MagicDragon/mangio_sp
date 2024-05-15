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
import ESSingleLabelValue from "../components/ESSingleLabelValue";
import ESListView from "../components/ESListView";
import ESLabel from "../components/ESLabel";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import cloneDeep from "lodash/cloneDeep";

const AddTemplate = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  const store = useContext(ESContext);
  const item = route.params;

  useEffect(() => {
    if (item != null) {
      setRequest(cloneDeep(item));
    } else {
      setRequest({
        isDefault: 0,
      });
    }
  }, []);

  let addEditTemplate = () => {
    if (request.brand == null || request.brand.length == 0) {
      alert("Brand is required");
      return;
    }
    store.addEditEsTemplate(request, (results) => {
      console.log("Results", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Template Updated",
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
      } else alert("Template Update Failed");
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
          {/* <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardAvoid}
            > */}
          <ESTextFieldWithLabel
            label="Brand"
            onChangeText={(val) => onChange(val, request, "brand")}
            maxLength={100}
            value={request.brand}
          />
          <View style={styles.row}>
            <ESTextFieldWithLabel
              label="Generic"
              onChangeText={(val) => onChange(val, request, "generic")}
              maxLength={100}
              value={request.generic}
              isRowItem
              withMarginRight
            />
            <ESTextFieldWithLabel
              label="Formulation"
              onChangeText={(val) => onChange(val, request, "formulation")}
              maxLength={100}
              value={request.formulation}
              isRowItem
            />
          </View>
          <ESButton title="Save" customClick={addEditTemplate} />
          {/* </KeyboardAvoidingView>
          </ScrollView> */}
        </View>
      </SafeAreaView>
    )
  );
};

export default AddTemplate;
