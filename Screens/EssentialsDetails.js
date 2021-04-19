import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";

function EssentialsDetails() {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  const openDialScreen = () => {
    let number = "";
    if (Platform.OS === "ios") {
      number = "telprompt:${+917898690939}";
    } else {
      number = "tel:${+917898690939}";
    }
    Linking.openURL(number);
  };
  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => openDialScreen()}>
          <Text style={{ color: "white" }}>Click to Open Dial Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default EssentialsDetails;
