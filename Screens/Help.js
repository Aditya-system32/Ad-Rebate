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
import {
  ScrollView,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";

export default function HelpScreen({ navigation }) {
  const [queries, setQueries] = useState([
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
      <ScrollView style={{ width: "100%", marginTop: 40 }}>
        {queries.map((item, index) => {
          const [visi, setvisi] = useState(false);
          return (
            <TouchableNativeFeedback
              style={[styles.query]}
              key={index}
              onPress={() => setvisi(!visi)}
            >
              <Text style={[styles.que]}>{item.question}</Text>
              {visi ? <Text style={[styles.ans]}>{item.answer}</Text> : null}
            </TouchableNativeFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  query: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    margin: 10,
    minHeight: 50,
  },
  hidden: {
    width: 0,
    height: 0,
  },
  que: {
    width: "100%",
    height: 40,
    color: "black",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    textAlignVertical: "center",
  },
  ans: {
    width: "100%",
    backgroundColor: "#2c2c2c",
    color: "#eeeeee",
    fontSize: 13,
    lineHeight: 30,
    padding: 20,
    textAlignVertical: "center",
    fontFamily: "Poppins-Regular",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
