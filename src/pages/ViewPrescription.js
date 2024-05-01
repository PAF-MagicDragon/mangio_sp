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
          <ESValueWithLabel label="Date" value={prescription.createDate} />
          <ESValueWithLabel label="Diagnosis" value={prescription.diagnosis} />
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
                  <Text>Duration: {item.duration}</Text>
                  <Text>
                    Type:
                    {store.getLabelFromValue(item.type, constants.LIST_TYPE)}
                  </Text>
                  <Text>Instructions: {item.instructions}</Text>
                </View>
              );
            }}
            customViewClick={(item) => alert("VIEW" + item.id)}
          />
          {/* </KeyboardAvoidingView>
          </ScrollView> */}
        </View>
      </SafeAreaView>
    )
  );
};

export default ViewPrescription;
