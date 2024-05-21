import { StyleSheet, Dimensions } from "react-native";
const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

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
    backgroundColor: "#ffffff",
  },
  viewSub: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    marginRight: 10,
  },
  defaultBackground: {
    backgroundColor: "#ffffff",
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
    marginRight: 20,
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
    marginTop: 5,
    marginBottom: 5,
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

  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
    alignItems: "center",
  },

  lowCountSchedule: {
    backgroundColor: "#F8C1B3",
    padding: 10,
    borderRadius: 10,
  },

  expiredSchedule: {
    backgroundColor: "#4D5663",
    padding: 10,
    borderRadius: 10,
  },

  pendingSchedule: {
    backgroundColor: "#F8ECB3",
    padding: 10,
    borderRadius: 10,
  },

  completedSchedule: {
    backgroundColor: "#CFF8B3",
    padding: 10,
    borderRadius: 10,
  },

  defaultListStyle: {
    backgroundColor: "#E1EBF8",
    padding: 10,
    borderRadius: 10,
  },

  tabContainer: {
    paddingBottom: 100,
  },

  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imagedelete: {
    alignItems: "flex-end",
  },
  imageStretch: {
    width: 300,
    height: 100,
    resizeMode: "stretch",
  },
});

export default styles;
