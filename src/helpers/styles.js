import { StyleSheet } from "react-native";

export const navOptions = {
  headerStyle: {
    backgroundColor: "#f4511e", //Set Header color
  },
  headerTintColor: "#fff", //Set Header text color
  headerTitleStyle: {
    fontWeight: "bold", //Set Header text style
  },
};

const styles = StyleSheet.create({
  viewMain: { flex: 1 },
  viewSub: { flex: 1, backgroundColor: "#ffffff" },
  button1: {
    alignItems: "center",
    backgroundColor: "#008080",
    color: "#ffffff",
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  buttonLabel1: {
    color: "#ffffff",
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#20b2aa",
    color: "#ffffff",
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  buttonLabel2: {
    color: "#ffffff",
  },
  label: {
    color: "#000000",
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  value: {
    color: "#808080",
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  textField: {
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    borderColor: "#1e90ff",
    borderWidth: 1,
    padding: 10,
  },
  keyboardAvoid: { flex: 1, justifyContent: "space-between" },
  ///
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "grey",
    height: 600,
  },
  redbox: {
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
  bluebox: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
  blackbox: {
    width: 100,
    height: 100,
    backgroundColor: "black",
  },
  container: {
    width: 800,
    margin: "auto",
  },
  title: {
    fontSize: 32,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#AA4A44",
  },
});

export default styles;
