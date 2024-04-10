import React, { useEffect, useContext } from "react";
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
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";

const Stack = createNativeStackNavigator();

const Main = () => {
  const store = useContext(ESContext);
  useEffect(() => {
    store.initializeAllTables();
  }, []);
  // state = {
  //   myState: "The Quick Brown Fox Jumps Over The Lazy Dog 2",
  // };
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
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
  );
};
export default Main;
