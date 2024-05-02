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
import ESListView from "../components/ESListView";
import ESDatePicker from "../components/ESDatePicker";
import ESValue from "../components/ESValue";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import cloneDeep from "lodash/cloneDeep";

const AddPrescription = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  let [drugList, setDrugList] = useState([]);
  const store = useContext(ESContext);
  const isFocused = useIsFocused();
  const obj = route.params;
  const patientId = obj.patientId;
  const item = obj.item;

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setDrugList([...store.tempDrugList]);
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  useEffect(() => {
    console.log("DRUG LIST ON USE EFFECT", store.tempDrugList);
    if (item != null) {
      setRequest(cloneDeep(item));
      store.getDrugs(item.id, (list) => {
        store.tempDrugList = list;
        setDrugList([...store.tempDrugList]);
      });
    } else {
      setRequest({
        doctorId: store.mainUser.id,
        patientId: patientId,
        createDate: new Date().getTime(),
      });
      store.tempDrugList = [];
      setDrugList([...store.tempDrugList]);
    }
  }, []);

  let addDrug = () => {
    console.log("DRUG LIST ON NAV", store.tempDrugList);
    navigation.navigate("AddDrug");
  };

  let deleteDrug = (item, index) => {
    alert("TODO Delete Drug:" + index);
    console.log("DRUG LIST ON DEL 1", store.tempDrugList);
    store.tempDrugList.splice(index, 1);
    setDrugList([...store.tempDrugList]);
    console.log("DRUG LIST ON DEL 2", store.tempDrugList);
  };

  let addEditPrescription = () => {
    request.drugList = drugList;
    if (request.diagnosis == null || request.diagnosis.length == 0) {
      alert("Diagnosis is required");
      return;
    }
    if (request.drugList.length == 0) {
      alert("At least one drug is required");
      return;
    }
    store.addEditEsPrescription(request, (results) => {
      console.log("Results", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Prescription Updated",
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
      } else alert("Prescription Update Failed");
    });
  };

  let onChange = (val, obj, field) => {
    obj[field] = val;
    setRequest((request) => ({
      ...request,
      ...obj,
    }));
  };

  let currDate = new Date().toLocaleString("en-GB", {
    hour12: false,
  });

  return (
    request &&
    isFocused && (
      <SafeAreaView style={styles.viewMain}>
        <View style={styles.viewSub}>
          {/* <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardAvoid}
            > */}
          <View style={styles.row}>
            <ESDatePicker
              label="Date"
              value={request.createDate}
              onChange={(val) => onChange(val, request, "createDate")}
              isRowItem
              withMarginRight
            />
            <View style={styles.rowitems}></View>
          </View>

          <View style={styles.row}>
            <ESTextFieldWithLabel
              label="Height"
              onChangeText={(val) => onChange(val, request, "height")}
              maxLength={8}
              value={request.height}
              keyboardType="decimal-pad"
              isRowItem
              withMarginRight
            />
            <ESTextFieldWithLabel
              label="Weight"
              onChangeText={(val) => onChange(val, request, "weight")}
              maxLength={8}
              value={request.weight}
              keyboardType="decimal-pad"
              isRowItem
            />
          </View>
          <ESTextFieldWithLabel
            label="Diagnosis"
            onChangeText={(val) => onChange(val, request, "diagnosis")}
            maxLength={250}
            value={request.diagnosis}
            numberOfLines={3}
            multiline={true}
          />
          <ESListView
            header="Drugs"
            list={drugList}
            customPanel={(item) => {
              return (
                <View>
                  <Text>Name: {item.name}</Text>
                  <Text>Strength: {item.strength}</Text>
                  <Text>Dose: {item.dose}</Text>
                  <Text>
                    Preparation:
                    {store.getLabelFromValue(
                      item.preparation,
                      constants.LIST_PREPARATION
                    )}
                  </Text>
                  <Text>
                    Frequency:
                    {store.getLabelFromValue(
                      item.frequency,
                      constants.LIST_FREQUENCY
                    )}
                  </Text>
                  <Text>
                    Direction:
                    {store.getLabelFromValue(
                      item.direction,
                      constants.LIST_DIRECTION
                    )}
                  </Text>
                  <Text>
                    Route:
                    {store.getLabelFromValue(item.route, constants.LIST_ROUTE)}
                  </Text>
                  <Text>Instructions: {item.instructions}</Text>
                </View>
              );
            }}
            customViewClick={(item) => alert("VIEW" + item.id)}
            customAddClick={addDrug}
            customEditClick={(item, index) =>
              alert("EDIT: " + item.id + "INDEX: " + index)
            }
            customDeleteClick={(item, index) => deleteDrug(item, index)}
          />
          <ESButton title="Submit" customClick={addEditPrescription} />
          {/* </KeyboardAvoidingView>
          </ScrollView> */}
        </View>
      </SafeAreaView>
    )
  );
};

export default AddPrescription;
