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
  const prescription = route.params;

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
            <ESValueWithLabel
              label="Date"
              value={store.convertDateIntToString(prescription.createDate)}
              noMarginTopValue
            />
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
