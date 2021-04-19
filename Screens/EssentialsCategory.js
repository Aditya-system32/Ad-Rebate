import React from "react";
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
