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

const AddDrug = ({ navigation }) => {
  let [request, setRequest] = useState(null);
  let [templateData, setTemplateData] = useState([]);
  let [preparationData, setPreparationData] = useState([]);
  let [routeData, setRouteData] = useState([]);
  let [directionData, setDirectionData] = useState([]);
  let [frequencyData, setFrequencyData] = useState([]);
  let [typeData, setTypeData] = useState([]);
  const store = useContext(ESContext);

  useEffect(() => {
    setRequest({});
    store.initializeTemplateData((list) => {
      setTemplateData(list);
    });
    setPreparationData(store.formDropDownData(constants.LIST_PREPARATION));
    setRouteData(store.formDropDownData(constants.LIST_ROUTE));
    setDirectionData(store.formDropDownData(constants.LIST_DIRECTION));
    setFrequencyData(store.formDropDownData(constants.LIST_FREQUENCY));
    setTypeData(store.formDropDownData(constants.LIST_TYPE));
  }, []);

  let addEditDrug = () => {
    store.tempDrugList.push(request);
    navigation.pop();
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
                data={templateData}
                onChange={(val) => onChange(val, request, "name")}
                value={request.name}
              />
              <View style={styles.row}>
                <ESTextFieldWithLabel
                  label="Strength"
                  onChangeText={(val) => onChange(val, request, "strength")}
                  maxLength={50}
                  value={request.strength}
                  isRowItem
                  withMarginRight
                />
                <ESTextFieldWithLabel
                  label="Dose"
                  onChangeText={(val) => onChange(val, request, "dose")}
                  maxLength={50}
                  value={request.dose}
                  isRowItem
                />
              </View>
              <View style={styles.row}>
                <ESDropDownWithLabel
                  label="Preparation"
                  data={preparationData}
                  onChange={(val) => onChange(val, request, "preparation")}
                  value={request.preparation}
                  isRowItem
                  withMarginRight
                />
                <ESDropDownWithLabel
                  label="Route"
                  data={routeData}
                  onChange={(val) => onChange(val, request, "route")}
                  value={request.route}
                  isRowItem
                />
              </View>
              <View style={styles.row}>
                <ESDropDownWithLabel
                  label="Direction"
                  data={directionData}
                  onChange={(val) => onChange(val, request, "direction")}
                  value={request.direction}
                  isRowItem
                  withMarginRight
                />
                <ESDropDownWithLabel
                  label="Frequency"
                  data={frequencyData}
                  onChange={(val) => onChange(val, request, "frequency")}
                  value={request.frequency}
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
              <ESTextFieldWithLabel
                label="Instructions"
                onChangeText={(val) => onChange(val, request, "instructions")}
                maxLength={250}
                value={request.instructions}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: "top" }}
              />
              <ESButton title="Add" customClick={addEditDrug} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default AddDrug;
