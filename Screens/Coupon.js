import "react-native-gesture-handler";
import React, { useContext } from "react";
import { Button, View, Text, StyleSheet, StatusBar } from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";

export default function CouponScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  function test() {
    const usersCollection = db.collection("Users").doc(user.uid);
    usersCollection.set({ tokens: "tokens" }, { merge: true }).then(() => {
      console.log("Token added");
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
