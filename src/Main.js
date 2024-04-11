import React, { useState, useEffect, useContext } from "react";
import { styles, navOptions } from "./helpers/styles";
import * as strings from "./helpers/strings";
import * as constants from "./helpers/constants";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./pages/HomeScreen";
import RegisterUser from "./pages/RegisterUser";
import UpdateUser from "./pages/UpdateUser";
import ViewUser from "./pages/ViewUser";
import ViewAllUser from "./pages/ViewAllUser";
import DeleteUser from "./pages/DeleteUser";

import ESContext from "./ESContext";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

const Stack = createNativeStackNavigator();

const Main = () => {
  let [initialPage, setInitialPage] = useState("");
  const store = useContext(ESContext);

  tempMethod = () => {
    console.log("ASYNC 1");
    store.initializeAllTables();
    console.log("ASYNC 2");
    store.initializeMainUser(() => {
      console.log("ASYNC 3");
      let tempPage = "Home";
      let type = store.mainUser.type;
      console.log("CHECK TYPE", store.mainUser);
      if (type != null) {
        console.log("CHECK TYPE 2", store.mainUser);
        if (type == constants.TYPE_MAIN_DOCTOR) {
          console.log("CHECK TYPE 3", store.mainUser);
          tempPage = "DoctorDashboard";
        } else if (type == constants.TYPE_MAIN_PATIENT) {
          console.log("CHECK TYPE 4", store.mainUser);
          tempPage = "PatientDashboard";
        }
        console.log("CHECK TYPE 5", store.mainUser);
      }
      console.log("CHECK TYPE 6", store.mainUser);
      setInitialPage(tempPage);
      console.log("ASYNC 4", initialPage);
    });
  };

  useEffect(() => {
    this.tempMethod();
  }, []);

  // updateState = () => {
  //   const { store } = { ...this.props };
  //   this.setState({ myState: "The state is updated" });
  //   store.var1 = "FRANC CHANGES 2";
  // };
  // const { store } = { ...this.props };
  // return (
  //   <View style={styles.container}>
  //     <Text onPress={this.updateState}>{this.state.myState}</Text>
  //     <View style={styles.blackbox} />
  //     <Text style={styles.title}>{strings.LABEL1}</Text>
  //     <View style={styles.redbox} />
  //     <Text style={styles.title}>{temp1}</Text>
  //     <View style={styles.bluebox} />
  //     <Text style={styles.title}>{store.var1}</Text>
  //     <Text style={styles.description}>{constants.CONSTANT1}</Text>
  //   </View>
  // );

  return (
    initialPage && (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialPage}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "Profile",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="DoctorDashboard"
            component={DoctorDashboard}
            options={{
              title: "Dashboard",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="PatientDashboard"
            component={PatientDashboard}
            options={{
              title: "Dashboard",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: "Home",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="View"
            component={ViewUser}
            options={{
              title: "View User",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="ViewAll"
            component={ViewAllUser}
            options={{
              title: "View Users",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="Update"
            component={UpdateUser}
            options={{
              title: "Update User",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterUser}
            options={{
              title: "Register User",
              ...navOptions,
            }}
          />
          <Stack.Screen
            name="Delete"
            component={DeleteUser}
            options={{
              title: "Delete User",
              ...navOptions,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};
export default Main;
