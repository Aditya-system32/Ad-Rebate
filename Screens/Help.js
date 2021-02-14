import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  BackHandler,
} from "react-native";

export default function HelpScreen({ navigation }) {
  const [quries, setQuries] = useState([
    {
      question: "How to Redeem Coupon",
      answer:
        "Step 1 - Go to home screen\nStep 2 - Select Barcode from top right corner\nStep 3 - Ask for the barcode from shopkeeper and scan the qr code\nStep 4 - Enter you bill and select the coupon you want to apply\nStep 5 - Show the Verified coupon and last bill to the shopkeeper and pay the amount give in the app ",
    },
    {
      question: "How to Get Coupon",
      answer:
        "Step 1 - Go to home screen\nStep 2 -Select the category whose coupon you want\nStep 3 - Select the café and restaurant whose coupon you want\nStep 4 - Watch 3 Ads and answer one question\nStep 5 - You'll get coupon and the coupon will active after 1 hour",
    },
    {
      question: "Why I Can't See My Coupon",
      answer:
        "Your Coupon Will activate after 1 hour , you can see your coupon in all section ",
    },
  ]);
  BackHandler.addEventListener("hardwareBackPress", function () {
    navigation.pop();
    return true;
  });
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Button title="Why I can't see my Coupon" />
      <Button
        title="How To Redeem Coupon"
        onPress={() => navigation.goBack()}
      />
      <Button title="How To Get Coupon" onPress={() => navigation.goBack()} />
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
