import "react-native-gesture-handler";
import React from "react";
import { Button, View, Text, StyleSheet, StatusBar } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text>Profile</Text>
      <Button
        title="App Slider"
        onPress={() => navigation.navigate("ShareCoupons")}
      />
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
