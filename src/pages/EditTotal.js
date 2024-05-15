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
import cloneDeep from "lodash/cloneDeep";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import ESIcon from "../components/ESIcon";

const EditTotal = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  const store = useContext(ESContext);
  const item = route.params;

  useFocusEffect(
    React.useCallback(() => {
      if (item != null) {
        setRequest(cloneDeep(item));
      } else {
        setRequest({});
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  let addEditTotal = () => {
    if (request.total == null || request.total.length == 0) {
      alert("Total is required");
      return;
    } else {
      if (store.checkIfDigitsOnly(request.total)) {
      } else {
        alert("Please enter a valid total");
        return;
      }
    }
    store.editTotal(request, (results) => {
      console.log("Results", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Total Updated",
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
      } else alert("Total Update Failed");
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
              <ESValueWithLabel label="Drug" value={request.name} />
              <View style={styles.row}>
                <ESValueWithLabel
                  label="Strength/Dose"
                  value={request.strength}
                  isRowItem
                  withMarginRight
                />

                <ESValueWithLabel
                  label="Preparation"
                  value={store.getLabelFromValue(
                    request.preparation,
                    constants.LIST_PREPARATION
                  )}
                  isRowItem
                />
              </View>
              <View style={styles.row}>
                <ESValueWithLabel
                  label="Route"
                  value={store.getLabelFromValue(
                    request.route,
                    constants.LIST_ROUTE
                  )}
                  isRowItem
                  withMarginRight
                />
                <ESValueWithLabel
                  label="Direction"
                  value={store.getLabelFromValue(
                    request.direction,
                    constants.LIST_DIRECTION
                  )}
                  isRowItem
                />
              </View>
              <View style={styles.row}>
                <ESValueWithLabel
                  label="Duration"
                  value={request.duration}
                  isRowItem
                  withMarginRight
                />
                <ESValueWithLabel
                  label="Type"
                  value={store.getLabelFromValue(
                    request.type,
                    constants.LIST_TYPE
                  )}
                  isRowItem
                />
              </View>
              <View style={styles.row}>
                <ESValueWithLabel
                  label="Frequency"
                  value={store.getLabelFromValue(
                    request.frequency,
                    constants.LIST_FREQUENCY
                  )}
                  isRowItem
                  withMarginRight
                />
                <ESTextFieldWithLabel
                  label="Total"
                  onChangeText={(val) => onChange(val, request, "total")}
                  maxLength={8}
                  value={request.total}
                  keyboardType="decimal-pad"
                  isRowItem
                />
              </View>
              <ESValueWithLabel
                label="Instructions"
                value={request.instructions}
              />
              <ESButton title="Save" customClick={addEditTotal} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default EditTotal;
