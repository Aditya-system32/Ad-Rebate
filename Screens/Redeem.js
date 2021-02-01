import "react-native-gesture-handler";
import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function RedeemScreen({ route }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Text>{route.params.paramKey}</Text>
        <Text>Enter the Bill</Text>
        <TextInput keyboardType="phone-pad" placeholder="Enter The Bill" />
        <Text>Coupons</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
