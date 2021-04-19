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
  TouchableNativeFeedback,
} from "react-native";

function EssentialsCategory({ navigation }) {
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
  return (
    <View>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate("EssentialsDetails")}
      >
        <Text style={{ color: "white" }}>EssentialsCategory</Text>
      </TouchableNativeFeedback>
    </View>
  );
}

export default EssentialsCategory;
