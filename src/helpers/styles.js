import { StyleSheet } from "react-native";

export const navOptions = {
  headerStyle: {
    backgroundColor: "#008080", //Set Header color
  },
  headerTintColor: "#ffffff", //Set Header text color
  headerTitleStyle: {
    fontWeight: "bold", //Set Header text style
  },
};

const styles = StyleSheet.create({
  showBorder: {
    borderColor: "#000000",
    borderWidth: 0.5,
  },
  viewMain: { flex: 1 },
  viewSub: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  rowitems: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowitemsWithMargin: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    marginRight: 10,
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#008080",
    color: "#ffffff",
    padding: 10,
    marginTop: 15,
    // marginLeft: 25,
    // marginRight: 25,
  },
  buttonLabel1: {
    color: "#ffffff",
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#20b2aa",
    color: "#ffffff",
    padding: 10,
    marginTop: 15,
    // marginLeft: 25,
    // marginRight: 25,
  },
  buttonLabel2: {
    color: "#ffffff",
  },
  label: {
    color: "#000000",
    fontSize: 14,
    marginTop: 10,
    // marginLeft: 25,
    // marginRight: 25,
    fontWeight: "bold",
  },
  value: {
    color: "#808080",
    fontSize: 14,
    marginTop: 10,
    // marginLeft: 25,
    // marginRight: 25,
  },
  textField: {
    // marginLeft: 25,
    // marginRight: 25,
    marginTop: 10,
    borderColor: "#1e90ff",
    borderWidth: 0.5,
    padding: 5,
  },
  radio: {
    // marginLeft: 25,
    // marginRight: 25,
    marginTop: 10,
    marginLeft: -10,
    padding: 10,
    // borderColor: "#1e90ff",
    // borderWidth: 0.5,
  },
  radioLabelStyle: {
    // borderColor: "#1e90ff",
    // borderWidth: 0.5,
    marginLeft: -5,
    marginRight: 10,
  },
  keyboardAvoid: { flex: 1, justifyContent: "space-between" },

  listViewItemSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#808080",
    marginTop: 10,
    marginBottom: 10,
  },

  listViewItem: {
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  listViewItem1: {
    flexGrow: 9,
    flexShrink: 9,
    flexBasis: 0,
  },

  listViewItem2: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignSelf: "center",
  },

  ///
  // container: {
  //   flexDirection: "column",
  //   justifyContent: "space-between",
  //   alignItems: "flex-end",
  //   backgroundColor: "grey",
  //   height: 600,
  // },
  // redbox: {
  //   width: 100,
  //   height: 100,
  //   backgroundColor: "red",
  // },
  // bluebox: {
  //   width: 100,
  //   height: 100,
  //   backgroundColor: "blue",
  // },
  // blackbox: {
  //   width: 100,
  //   height: 100,
  //   backgroundColor: "black",
  // },
  // container: {
  //   width: 800,
  //   margin: "auto",
  // },
  // title: {
  //   fontSize: 32,
  //   color: "#333",
  // },
  // description: {
  //   fontSize: 16,
  //   color: "#AA4A44",
  // },
});

export default styles;
