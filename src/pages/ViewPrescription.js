import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
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

const ViewPrescription = ({ navigation, route }) => {
  let [drugList, setDrugList] = useState([]);
  const store = useContext(ESContext);
  const isFocused = useIsFocused();
  const obj = route.params;
  const prescription = obj.item;
  const withEdit = obj.withEdit;

  console.log("VIEW PRESCRIPTION", prescription);

  let refreshList = () => {
    store.getDrugs(prescription.id, (list) => {
      setDrugList(list);
      console.log("VIEW DRUGS", drugList, list);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      refreshList();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  useEffect(() => {}, []);

  let editTotal = (item) => {
    navigation.navigate("EditTotal", item);
  };

  return (
    isFocused && (
      <SafeAreaView style={styles.viewMain}>
        <View style={styles.viewSub}>
          {/* <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardAvoid}
            > */}
          <View style={styles.withPadding}>
            <View style={styles.row}>
              <ESValueWithLabel
                label="Date"
                value={store.convertDateIntToStringWithTime(
                  prescription.createDate
                )}
                noMarginTopValue
                isRowItem
                withMarginRight
              />
              {prescription.doctorName && (
                <ESValueWithLabel
                  label="Doctor"
                  value={prescription.doctorName}
                  noMarginTopValue
                  isRowItem
                />
              )}
            </View>

            <ESValueWithLabel
              label="Diagnosis"
              value={prescription.diagnosis}
              noMarginTopValue
            />
            <View style={styles.row}>
              <ESValueWithLabel
                label="Height"
                value={prescription.height}
                noMarginTopValue
                isRowItem
                withMarginRight
              />
              <ESValueWithLabel
                label="Weight"
                value={prescription.weight}
                noMarginTopValue
                isRowItem
              />
            </View>
          </View>
          <View style={styles.withPadding}>
            <ESListView
              header="Drugs"
              list={drugList}
              customPanel={(item) => {
                return (
                  <View>
                    <ESLabel text={item.name} customStyle={styles.subHeader} />
                    <View style={styles.row}>
                      <ESSingleLabelValue
                        label="Strength/Dose"
                        value={item.strength}
                        customStyle={styles.valueNoMargin}
                        isRowItem
                        withMarginRight
                      />
                      <ESSingleLabelValue
                        label="Preparation"
                        value={store.getLabelFromValue(
                          item.preparation,
                          constants.LIST_PREPARATION
                        )}
                        customStyle={styles.valueNoMargin}
                        isRowItem
                      />
                    </View>
                    <View style={styles.row}>
                      <ESSingleLabelValue
                        label="Route"
                        value={store.getLabelFromValue(
                          item.route,
                          constants.LIST_ROUTE
                        )}
                        customStyle={styles.valueNoMargin}
                        isRowItem
                        withMarginRight
                      />
                      <ESSingleLabelValue
                        label="Direction"
                        value={store.getLabelFromValue(
                          item.direction,
                          constants.LIST_DIRECTION
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
                    <View style={styles.row}>
                      <ESSingleLabelValue
                        label="Frequency"
                        value={store.getLabelFromValue(
                          item.frequency,
                          constants.LIST_FREQUENCY
                        )}
                        customStyle={styles.valueNoMargin}
                        isRowItem
                        withMarginRight
                      />
                      <ESSingleLabelValue
                        label="Total"
                        value={item.total}
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
              customActionClick={withEdit ? (item) => editTotal(item) : null}
              customActionIcon="refresh-outline"
            />
          </View>
          {/* </KeyboardAvoidingView>
          </ScrollView> */}
        </View>
      </SafeAreaView>
    )
  );
};

export default ViewPrescription;
