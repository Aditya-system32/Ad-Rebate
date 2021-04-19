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
  TouchableNativeFeedback,
} from "react-native";

function Essentials({ navigation }) {
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
        onPress={() => navigation.navigate("EssentialsCategory")}
      >
        <Text style={{ color: "white" }}>Essentials</Text>
      </TouchableNativeFeedback>
    </View>
  );
}

export default Essentials;
