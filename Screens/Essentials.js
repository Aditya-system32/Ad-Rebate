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
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

function Essentials({ navigation }) {
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
