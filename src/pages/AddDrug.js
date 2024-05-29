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

const AddDrug = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  let [templateData, setTemplateData] = useState([]);
  let [preparationData, setPreparationData] = useState([]);
  let [routeData, setRouteData] = useState([]);
  let [directionData, setDirectionData] = useState([]);
  let [frequencyData, setFrequencyData] = useState([]);
  let [typeData, setTypeData] = useState([]);
  const store = useContext(ESContext);
  const obj = route.params;
  const index = obj.index;
  const item = obj.item;

  useFocusEffect(
    React.useCallback(() => {
      if (item != null) {
        setRequest(cloneDeep(item));
      } else {
        setRequest({});
      }
      store.initializeTemplateData((list) => {
        setTemplateData(list);
      });
      setPreparationData(
        store.formDropDownData(constants.LIST_PREPARATION, true)
      );
      setRouteData(store.formDropDownData(constants.LIST_ROUTE, true));
      setDirectionData(store.formDropDownData(constants.LIST_DIRECTION, true));
      setFrequencyData(store.formDropDownData(constants.LIST_FREQUENCY));
      setTypeData(store.formDropDownData(constants.LIST_TYPE));
      navigation.setOptions({
        headerRight: () => (
          <ESIcon
            name="duplicate-outline"
            color="#ffffff"
            customClick={() => navigation.navigate("ViewTemplate")}
          />
        ),
      });
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  let addEditDrug = () => {
    if (request.name == null) {
      alert("Drug is required");
      return;
    }
    if (request.strength == null || request.strength.length == 0) {
      alert("Strength/Dose is required");
      return;
    }
    if (request.preparation == null) {
      alert("Preparation is required");
      return;
    }
    if (request.route == null) {
      alert("Route is required");
      return;
    }
    if (request.direction == null) {
      alert("Direction is required");
      return;
    }
    if (request.frequency == null) {
      alert("Frequency is required");
      return;
    }
    if (request.duration == null || request.duration.length == 0) {
      alert("Frequency is required");
      return;
    } else {
      if (store.checkIfDigitsOnly(request.duration) && request.duration > 0) {
      } else {
        alert("Please enter a valid duration");
        return;
      }
    }
    if (request.type == null) {
      alert("Type is required");
      return;
    }
    if (request.total == null || request.total.length == 0) {
      alert("Total is required");
      return;
    } else {
      if (store.checkIfDigitsOnly(request.total) && request.total > 0) {
      } else {
        alert("Please enter a valid total");
        return;
      }
    }
    if (item != null) {
      store.tempDrugList.splice(index, 1, request);
    } else {
      store.tempDrugList.push(request);
    }
    navigation.pop();
  };

  let onChange = (val, obj, field) => {
    obj[field] = val;
    store.computeTotal(obj, field);
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
                data={templateData}
                onChange={(val) => onChange(val, request, "name")}
                value={request.name}
              />
              <View style={styles.row}>
                <ESTextFieldWithLabel
                  label="Strength/Dose"
                  onChangeText={(val) => onChange(val, request, "strength")}
                  maxLength={50}
                  value={request.strength}
                  isRowItem
                  withMarginRight
                />
                <ESDropDownWithLabel
                  label="Preparation"
                  data={preparationData}
                  onChange={(val) => onChange(val, request, "preparation")}
                  value={request.preparation}
                  isRowItem
                />
              </View>
              <View style={styles.row}>
                <ESDropDownWithLabel
                  label="Route"
                  data={routeData}
                  onChange={(val) => onChange(val, request, "route")}
                  value={request.route}
                  isRowItem
                  withMarginRight
                />
                <ESDropDownWithLabel
                  label="Direction"
                  data={directionData}
                  onChange={(val) => onChange(val, request, "direction")}
                  value={request.direction}
                  isRowItem
                />
              </View>
              <View style={styles.row}>
                <ESTextFieldWithLabel
                  label="Duration"
                  onChangeText={(val) => onChange(val, request, "duration")}
                  maxLength={8}
                  value={request.duration}
                  keyboardType="decimal-pad"
                  isRowItem
                  withMarginRight
                />
                <ESDropDownWithLabel
                  label="Type"
                  data={typeData}
                  onChange={(val) => onChange(val, request, "type")}
                  value={request.type}
                  isRowItem
                />
              </View>
              <View style={styles.row}>
                <ESDropDownWithLabel
                  label="Frequency"
                  data={frequencyData}
                  onChange={(val) => onChange(val, request, "frequency")}
                  value={request.frequency}
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
              <ESTextFieldWithLabel
                label="Instructions"
                onChangeText={(val) => onChange(val, request, "instructions")}
                maxLength={250}
                value={request.instructions}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: "top" }}
              />
              <ESButton title="Save" customClick={addEditDrug} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default AddDrug;
