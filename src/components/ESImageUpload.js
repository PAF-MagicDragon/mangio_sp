import React, { useState, useEffect } from "react";
import { View, Image, Button, Platform } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import styles from "../helpers/styles";
import ESIcon from "./ESIcon";
import ESButton from "./ESButton";
import { style } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes";

const ESImageUpload = (props) => {
  const [photo, setPhoto] = useState(null);

  const onChange = props.onChange;

  useEffect(() => {
    if (props.value != null) {
      setPhoto(props.value);
    } else {
      setPhoto(null);
    }
  }, []);

  const handleChoosePhoto = () => {
    launchImageLibrary({ includeBase64: true }, (response) => {
      let base64 = null;
      if (response && response.assets != null && response.assets.length > 0) {
        base64 = response.assets[0].base64;
      }
      setPhoto(base64);
      onChange && onChange(base64);
    });
  };

  const deletePhoto = () => {
    setPhoto(null);
    onChange && onChange(null);
  };

  return (
    <View style={styles.imageContainer}>
      {photo && (
        <View style={styles.row}>
          <Image
            source={{ uri: "data:image/png;base64," + photo }}
            // source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={[styles.imageStretch, styles.rowitems]}
          />
          <ESIcon
            name="close-circle-outline"
            customClick={deletePhoto}
            style={styles.imagedelete}
            isRowItem
          />
        </View>
      )}
      <ESButton
        title="Choose Photo"
        customClick={handleChoosePhoto}
        subButton
      />
      {/* <ESIcon
        name="image-outline"
        customClick={handleChoosePhoto}
        style={styles.imagedelete}
        isRowItem
      /> */}
    </View>
  );
};

export default ESImageUpload;
