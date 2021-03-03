import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, BackHandler } from "react-native";
import {
  ScrollView,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import { View as MotiView } from "moti";
import { AnimatePresence } from "moti";
import { scaledSize } from "./Home";
export default function HelpScreen({ navigation }) {
  const [queries, setQueries] = useState([
    {
      question: "How to Redeem Coupon?",
      answer:
        "Step 1 - Go to home screen.\nStep 2 - Select Barcode from top right corner.\nStep 3 - Ask for the barcode from shopkeeper and scan the qr code.\nStep 4 - Enter you bill and select the coupon you want to apply.\nStep 5 - Show the Verified coupon and last bill to the shopkeeper and pay the amount give in the app.",
    },
    {
      question: "How to Get Coupon?",
      answer:
        "Step 1 - Go to home screen.\nStep 2 -Select the category whose coupon you want.\nStep 3 - Select the café and restaurant whose coupon you want.\nStep 4 - Watch 3 Ads and answer one question.\nStep 5 - You'll get coupon and the coupon will active after 1 hour.",
    },
    {
      question: "Why I Can't See My Coupon?",
      answer:
        "Your Coupon Will activate after 1 hour , you can see your coupon in all section.",
    },
    {
      question: "Found a bug ?, Contact us at",
      answer: "adrebate2020@gmail.com",
    },
  ]);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <ScrollView style={{ width: "100%", marginTop: 40 }}>
        {queries.map((item, index) => {
          const [visi, setvisi] = useState(false);
          return (
            <MotiView
              key={index}
              style={[styles.query]}
              from={{
                opacity: 0,
                scaleY: 0,
              }}
              animate={{
                opacity: 1,
                scaleY: 1,
              }}
              transition={{
                type: "spring",
              }}
              exit={{
                opacity: 0,
              }}
            >
              <TouchableNativeFeedback onPress={() => setvisi(!visi)}>
                <AnimatePresence>
                  <MotiView
                    from={{
                      opacity: 0,
                      translateY: -50,
                      scaleX: 50,
                    }}
                    animate={{
                      opacity: 1,
                      translateY: 0,
                    }}
                    transition={{
                      type: "spring",
                    }}
                    exit={{
                      opacity: 0,
                      translateY: -50,
                    }}
                  >
                    <Text style={[styles.que]}>{item.question}</Text>
                  </MotiView>
                </AnimatePresence>
                <AnimatePresence>
                  {visi ? (
                    <MotiView
                      from={{
                        opacity: 0,
                        translateY: -50,
                      }}
                      animate={{
                        opacity: 1,
                        translateY: 0,
                      }}
                      transition={{
                        type: "timing",
                      }}
                      exit={{
                        opacity: 0,
                        translateY: -50,
                      }}
                    >
                      <Text style={[styles.ans]}>{item.answer}</Text>
                    </MotiView>
                  ) : null}
                </AnimatePresence>
              </TouchableNativeFeedback>
            </MotiView>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  query: {
    backgroundColor: "black",
    borderRadius: scaledSize(10),
    width: "80%",
    borderColor: "#424242",
    borderWidth: 1,
    alignSelf: "center",
    margin: scaledSize(10),
    minHeight: scaledSize(60),
  },
  hidden: {
    width: 0,
    height: 0,
  },
  que: {
    width: "100%",
    height: scaledSize(60),
    paddingHorizontal: scaledSize(20),
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: scaledSize(15),
    textAlignVertical: "center",
  },
  ans: {
    width: "100%",
    backgroundColor: "#2c2c2c",
    color: "#eeeeee",
    fontSize: scaledSize(13),
    lineHeight: scaledSize(30),
    padding: scaledSize(20),
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
