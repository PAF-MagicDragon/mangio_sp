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
import ESIcon from "../components/ESIcon";
import styles from "../helpers/styles";
import ESContext from "../ESContext";
import * as constants from "../helpers/constants";
import ESRadioWithLabel from "../components/ESRadioWithLabel";
import ESRadio from "../components/ESRadio";
import ESDatePicker from "../components/ESDatePicker";
import cloneDeep from "lodash/cloneDeep";
import ESImageUploadWithLabel from "../components/ESImageUploadWithLabel";

const Profile = ({ navigation, route }) => {
  let [request, setRequest] = useState(null);
  const store = useContext(ESContext);
  const isFromHome = route.params;

  useEffect(() => {
    if (request == null) {
      setRequest(cloneDeep(store.mainUser));
    } else {
      navigation.setOptions({
        headerRight: () => (
          <View>
            <ESIcon
              name={
                request.type == constants.TYPE_MAIN_DOCTOR
                  ? "id-card-outline"
                  : "bandage-outline"
              }
              customClick={() => onChange(request.type, request, "type")}
              color="#ffffff"
            />
          </View>
        ),
      });
    }
  }, [request]);

  let updateProfile = () => {
    if (request.name == null || request.name.length == 0) {
      alert("Name is required");
      return;
    }
    if (request.address == null || request.address.length == 0) {
      alert("Address is required");
      return;
    }
    store.addEditEsUser(request, (results) => {
      if (results != null && results.rowsAffected > 0) {
        Alert.alert(
          "Success",
          "Profile Updated",
          [
            {
              text: "Ok",
              onPress: () => {
                store.initializeMainUser(() =>
                  isFromHome
                    ? navigation.replace("Dashboard")
                    : navigation.pop()
                );
              },
            },
          ],
          { cancelable: false }
        );
      } else alert("Profile Update Failed");
    });
  };

  let onChange = (val, obj, field) => {
    if (field == "type") {
      if (val != null) {
        if (val == constants.TYPE_MAIN_DOCTOR) {
          val = constants.TYPE_MAIN_PATIENT;
        } else {
          val = constants.TYPE_MAIN_DOCTOR;
        }
      }
    }
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
              {/* <View style={styles.rowReverse}>
                <View style={styles.rowitems}>
                  <ESRadio
                    value={request.type}
                    options={[
                      { label: "Doctor", value: constants.TYPE_MAIN_DOCTOR },
                      { label: "Patient", value: constants.TYPE_MAIN_PATIENT },
                    ]}
                    onChange={(val) => onChange(val, request, "type")}
                    customStyle={{
                      marginTop: 10,
                      marginBottom: -35,
                      marginLeft: 30,
                    }}
                  />
                </View>
                <View style={styles.rowitems}></View>
              </View> */}
              <ESTextFieldWithLabel
                label="Name"
                onChangeText={(val) => onChange(val, request, "name")}
                maxLength={100}
                value={request.name}
              />
              <ESTextFieldWithLabel
                label="Address"
                onChangeText={(val) => onChange(val, request, "address")}
                maxLength={250}
                value={request.address}
                numberOfLines={3}
                multiline={true}
              />
              <View style={styles.row}>
                <ESTextFieldWithLabel
                  label="Contact No"
                  onChangeText={(val) => onChange(val, request, "contactNo")}
                  maxLength={50}
                  value={request.contactNo}
                  keyboardType="number-pad"
                  isRowItem
                  withMarginRight
                />
                <ESTextFieldWithLabel
                  label="Email"
                  onChangeText={(val) => onChange(val, request, "email")}
                  maxLength={250}
                  value={request.email}
                  keyboardType="email-address"
                  isRowItem
                />
              </View>
              {request.type == constants.TYPE_MAIN_DOCTOR && (
                <View>
                  <ESTextFieldWithLabel
                    label="Clinic/Hospital"
                    onChangeText={(val) =>
                      onChange(val, request, "clinicHospital")
                    }
                    maxLength={250}
                    value={request.clinicHospital}
                  />
                  <ESTextFieldWithLabel
                    label="Specialization"
                    onChangeText={(val) =>
                      onChange(val, request, "specialization")
                    }
                    maxLength={100}
                    value={request.specialization}
                  />
                  <View style={styles.row}>
                    <ESTextFieldWithLabel
                      label="License No"
                      onChangeText={(val) =>
                        onChange(val, request, "licenseNo")
                      }
                      maxLength={50}
                      value={request.licenseNo}
                      isRowItem
                      withMarginRight
                    />
                    <ESTextFieldWithLabel
                      label="PTR No"
                      onChangeText={(val) => onChange(val, request, "ptrNo")}
                      maxLength={50}
                      value={request.ptrNo}
                      isRowItem
                    />
                  </View>
                  <ESImageUploadWithLabel
                    label="Signature"
                    onChange={(val) => onChange(val, request, "signature")}
                    value={request.signature}
                  />
                </View>
              )}
              {request.type == constants.TYPE_MAIN_PATIENT && (
                <View style={styles.row}>
                  <ESRadioWithLabel
                    label="Gender"
                    value={request.gender}
                    options={constants.LIST_GENDER}
                    onChange={(val) => onChange(val, request, "gender")}
                    isRowItem
                    withMarginRight
                  />
                  <ESDatePicker
                    label="Birthday"
                    value={request.bday}
                    onChange={(val) => onChange(val, request, "bday")}
                    isRowItem
                  />
                </View>
              )}
              <View style={styles.withPadding}>
                <ESButton title="Submit" customClick={updateProfile} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  );
};

export default Profile;
