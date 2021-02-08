import "react-native-gesture-handler";
import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  BackHandler,
} from "react-native";

export default function TransactionScreen({ navigation }) {
  BackHandler.addEventListener("hardwareBackPress", function () {
    navigation.popToTop();
    return true;
  });
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text>Transaction Histroy</Text>
      <Button title="Go back" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
