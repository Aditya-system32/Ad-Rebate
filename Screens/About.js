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

export default function AboutScreen({ navigation }) {
  BackHandler.addEventListener("hardwareBackPress", function () {
    navigation.goBack();
    return true;
  });
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Text>About</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
