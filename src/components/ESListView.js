import React from "react";
import { FlatList, View, Text } from "react-native";
import styles from "../helpers/styles";

let listViewItemSeparator = () => {
  return <View style={styles.listViewItemSeparator} />;
};

let listViewItem = (item, panel) => {
  return (
    <View key={item.id} style={styles.listViewItem}>
      {/* {panel} */}
      <Text>Id: {item.id}</Text>
      <Text>Name: {item.name}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Contact: {item.contactNo}</Text>
    </View>
  );
};

const ESListView = (props) => {
  const list = props.list;
  if (list != null && list.length > 0) {
    const customPanel = props.customPanel;
    return (
      <FlatList
        data={props.list}
        ItemSeparatorComponent={listViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => listViewItem(item, () => customPanel(item))}
      />
    );
  } else {
    return <Text>No Records Found</Text>;
  }
};

export default ESListView;
