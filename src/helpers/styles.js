import { StyleSheet } from "react-native";

export const navOptions = {
  headerStyle: {
    backgroundColor: "#004FAC", //Set Header color
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
  viewMain: {
    flex: 1,
  },
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
  rowReverse: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
  },
  rowitems: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  withMarginRight: {
    marginRight: 10,
  },
  withMarginTop: {
    marginTop: 10,
  },
  withPadding: {
    paddingTop: 10,
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#004FAC",
    color: "#ffffff",
    padding: 10,
    marginTop: 15,
  },
  buttonLabel1: {
    color: "#ffffff",
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#57A4FF",
    color: "#ffffff",
    padding: 10,
    marginTop: 15,
  },
  buttonLabel2: {
    color: "#ffffff",
  },
  header: {
    color: "#000000",
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
  },
  subHeader: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
  },
  value: {
    color: "#808080",
    fontSize: 14,
  },
  datePickerValue: {
    color: "#000000",
    fontSize: 14,
    marginTop: 15,
  },
  datePickerIcon: {
    marginTop: 40,
    marginRight: 70,
  },
  valueNoMargin: {
    color: "#808080",
    fontSize: 14,
  },
  textField: {
    // height: 40,
    marginTop: 10,
    borderColor: "#57A4FF",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
  },
  alignTop: {
    // height: 40,
    textAlignVertical: "top",
  },
  radio: {
    marginLeft: -10,
    padding: 10,
    // borderColor: "#57A4FF",
    // borderWidth: 0.5,
  },
  radioLabelStyle: {
    // borderColor: "#57A4FF",
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
    backgroundColor: "#ffffff",
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

  dropdown: {
    backgroundColor: "white",
    marginTop: 10,
    height: 40,
    borderColor: "#57A4FF",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#57A4FF",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#000000",
  },
  itemTextStyle: {
    fontSize: 14,
    color: "#57A4FF",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: "#57A4FF",
  },

  qrView: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 25,
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
