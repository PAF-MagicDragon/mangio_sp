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
import ESDatePicker from "../components/ESDatePicker";
import ESLabel from "../components/ESLabel";
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

  let addEditDrug = (item, index) => {
    console.log("ADD DRUG OBJ", item, index);
    navigation.navigate("AddDrug", {
      index: index,
      item: item,
    });
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
                  <ESLabel text={item.name} customStyle={styles.subHeader} />
                  <View style={styles.row}>
                    <ESSingleLabelValue
                      label="Strength"
                      value={item.strength}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                      withMarginRight
                    />
                    <ESSingleLabelValue
                      label="Dose"
                      value={item.dose}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                    />
                  </View>
                  <View style={styles.row}>
                    <ESSingleLabelValue
                      label="Preparation"
                      value={store.getLabelFromValue(
                        item.preparation,
                        constants.LIST_PREPARATION
                      )}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                      withMarginRight
                    />
                    <ESSingleLabelValue
                      label="Frequency"
                      value={store.getLabelFromValue(
                        item.frequency,
                        constants.LIST_FREQUENCY
                      )}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                    />
                  </View>
                  <View style={styles.row}>
                    <ESSingleLabelValue
                      label="Direction"
                      value={store.getLabelFromValue(
                        item.direction,
                        constants.LIST_DIRECTION
                      )}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                      withMarginRight
                    />
                    <ESSingleLabelValue
                      label="Route"
                      value={store.getLabelFromValue(
                        item.route,
                        constants.LIST_ROUTE
                      )}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                    />
                  </View>
                  <View style={styles.row}>
                    <ESSingleLabelValue
                      label="Duration"
                      value={item.duration}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                      withMarginRight
                    />
                    <ESSingleLabelValue
                      label="Type"
                      value={store.getLabelFromValue(
                        item.type,
                        constants.LIST_TYPE
                      )}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                    />
                  </View>
                  <ESSingleLabelValue
                    label="Instructions"
                    value={item.instructions}
                    customStyle={styles.valueNoMargin}
                  />
                </View>
              );
            }}
            // customViewClick={(item) => alert("VIEW" + item.id)}
            customAddClick={() => addEditDrug()}
            customEditClick={(item, index) => addEditDrug(item, index)}
            customDeleteClick={(item, index) =>
              store.confirm(
                () => deleteDrug(item, index),
                "Confirm",
                "Are you sure you want to delete this drug?"
              )
            }
          />
          <ESButton title="Save" customClick={addEditPrescription} />
          {/* </KeyboardAvoidingView>
          </ScrollView> */}
        </View>
      </SafeAreaView>
    )
  );
};

export default AddPrescription;
