import "react-native-gesture-handler";
import React from "react";
import { Button, View, Text, StyleSheet, StatusBar } from "react-native";
import { db } from "../firebases";

export default function CouponScreen({ navigation }) {
  function test() {
    const usersCollection = db.collection("Test");
    usersCollection
      .add({
        name: "Ada Lovelace",
        age: 30,
      })
      .then(() => {
        console.log("User added!");
      });
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text>Coupons</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="test" onPress={test} />
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
