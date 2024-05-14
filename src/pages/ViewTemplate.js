import React, { useState, useEffect, useContext } from "react";
import { View, Alert, SafeAreaView, Text, Platform } from "react-native";
import ESValueWithLabel from "../components/ESValueWithLabel";
import ESButton from "../components/ESButton";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import ESListView from "../components/ESListView";
import * as constants from "../helpers/constants";
import ESRadioWithLabel from "../components/ESRadioWithLabel";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import ESSingleLabelValue from "../components/ESSingleLabelValue";

const ViewTemplate = ({ navigation, route }) => {
  let [templates, setTemplates] = useState(null);

  const store = useContext(ESContext);

  let refreshList = () => {
    store.getTemplates(0, (list) => setTemplates(list));
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

  let addEditTemplate = (item) => {
    navigation.navigate("AddTemplate", item);
  };

  let deleteTemplate = (item) => {
    store.deleteTemplate(item.id, (results) => {
      console.log("Results delete template", results);
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Template Deleted",
          [
            {
              text: "Ok",
              onPress: () => {
                refreshList();
              },
            },
          ],
          { cancelable: false }
        );
      } else alert("Template Delete Failed");
    });
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <View style={styles.viewSub}>
        {/* <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoid}> */}
        <View style={styles.withPadding}>
          <ESListView
            header="Drugs"
            list={templates}
            customPanel={(item) => {
              return (
                <View>
                  <ESLabel text={item.brand} customStyle={styles.subHeader} />
                  <View style={styles.row}>
                    <ESSingleLabelValue
                      label="Generic"
                      value={item.generic}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                      withMarginRight
                    />
                    <ESSingleLabelValue
                      label="Formulation"
                      value={item.formulation}
                      customStyle={styles.valueNoMargin}
                      isRowItem
                    />
                  </View>
                </View>
              );
            }}
            customAddClick={() => addEditTemplate()}
            customEditClick={(item) => addEditTemplate(item)}
            customDeleteClick={(item) =>
              store.confirm(
                () => deleteTemplate(item),
                "Confirm",
                "Are you sure you want to delete this template?"
              )
            }
          />
        </View>
        {/* </KeyboardAvoidingView>
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default ViewTemplate;
