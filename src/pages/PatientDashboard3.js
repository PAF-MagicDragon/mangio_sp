import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import ESSingleLabelValue from "../components/ESSingleLabelValue";
import ESLabel from "../components/ESLabel";
import ESValue from "../components/ESValue";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";
import ESListView from "../components/ESListView";
import ESButton from "../components/ESButton";
import ESIcon from "../components/ESIcon";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const PatientDashboard3 = ({ navigation }) => {
  let [schedules, setSchedules] = useState(null);
  const store = useContext(ESContext);
  let user = store.mainUser;

  let refreshList = () => {
    console.log("REFRESH LIST 3");
    store.getSchedules(user.id, constants.STATUS_COMPLETED, (list) =>
      setSchedules(list)
    );
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

  return (
    <View style={styles.viewMain}>
      <View style={styles.withPadding}>
        <ESListView
          header="Completed Schedules"
          list={schedules}
          addStyle={(item) => {
            return styles.completedSchedule;
          }}
          customPanel={(item) => {
            return (
              <View>
                <ESLabel
                  text={
                    store.convertDateIntToString(item.intakeDate) +
                    " " +
                    store.convertDateIntToString2(item.intakeDate)
                  }
                  customStyle={styles.subHeader}
                />
                <ESLabel text={item.drugName} />
                <ESValue
                  text={
                    store.getLabelFromValue(
                      item.drugPreparation,
                      constants.LIST_PREPARATION
                    ) +
                    ", " +
                    store.getLabelFromValue(
                      item.drugRoute,
                      constants.LIST_ROUTE
                    ) +
                    ", " +
                    store.getLabelFromValue(
                      item.drugDirection,
                      constants.LIST_DIRECTION
                    )
                  }
                />
                {item.drugInstructions && (
                  <ESValue text={item.drugInstructions} />
                )}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default PatientDashboard3;
