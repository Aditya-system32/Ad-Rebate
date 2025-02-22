import React, { useEffect } from "react";
import {
  View,
  Text,
  BackHandler,
  Image,
  StyleSheet,
  Linking,
} from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import checkmark from "../assets/images/green-checkmark.png";
import { scaledSize } from "./Home";
export default function CouponRedeemed({ navigation, route }) {
  // (route.params.finalBill,),
  // (route.params.couponId,),
  // (route.params.discount,),
  // (route.params.userBill),
  // route.params.client
  useEffect(() => {
    const backAction = () => {
      navigation.popToTop();
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
  const handleRateUs = () => {
    Linking.openURL(
      "https://play.google.com/store/apps/details?id=" +
        "com.adverttonlineservices.adrebate"
    );
  };
  var current = new Date();
  const x =
    (current.getHours() < 10 ? "0" : "") +
    (current.getHours() % 12) +
    ":" +
    (current.getMinutes() < 10 ? "0" : "") +
    current.getMinutes() +
    " " +
    (current.getHours() < 12 ? "AM" : "PM");
  const d =
    (current.getDate() < 10 ? "0" : "") +
    current.getDate() +
    "-" +
    (current.getMonth() + 1 < 10 ? "0" : "") +
    (current.getMonth() + 1) +
    "-" +
    current.getFullYear();
  return (
    <View style={styles.page}>
      <Image resizeMode="cover" style={styles.image} source={checkmark}></Image>

      <Text style={styles.successText}>Successfully Redeemed</Text>
      <Text style={styles.id}>{"#" + route.params.couponId}</Text>
      <Text style={styles.text}>{route.params.client}</Text>
      <Text style={styles.text}>{d + " " + x}</Text>
      <Text style={styles.text}>{"Total Bill : " + route.params.userBill}</Text>
      <Text style={styles.text}>{`Discount : ${route.params.discount}`}</Text>
      <Text style={styles.textFinal}>
        {"Final Bill : " + route.params.finalBill}
      </Text>
      <TouchableNativeFeedback style={styles.buttonRate} onPress={handleRateUs}>
        <Text style={styles.buttonRateText}>Rate us on playstore</Text>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        style={styles.button}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.buttonText}>Go home</Text>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    color: "white",
    alignItems: "center",
  },
  image: {
    width: scaledSize(100),
    height: scaledSize(100),
    resizeMode: "cover",
    marginTop: scaledSize(60),
    marginBottom: scaledSize(20),
  },
  successText: {
    color: "#75ff68",

    fontFamily: "Poppins-SemiBold",
    fontSize: scaledSize(24),
  },
  text: {
    color: "#e2e2e2",
    textAlign: "center",
    width: "60%",
    marginBottom: scaledSize(5),
    alignSelf: "center",
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(18),
  },
  id: {
    color: "#b8b8b8",
    textAlign: "center",
    width: "60%",
    marginBottom: scaledSize(5),
    alignSelf: "center",
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(12),
  },
  textFinal: {
    color: "#7eff7a",
    textAlign: "center",
    width: "60%",
    marginBottom: scaledSize(5),
    alignSelf: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: scaledSize(20),
  },
  buttonText: {
    color: "#e2e2e2",
    textAlign: "center",
    width: "100%",
    alignSelf: "center",
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(18),
  },
  buttonRateText: {
    color: "#e1ffdb",
    textAlign: "center",
    width: "100%",
    alignSelf: "center",
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(18),
  },
  button: {
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4b4b4b",
    width: scaledSize(130),
    marginBottom: scaledSize(20),
    height: scaledSize(50),
    borderRadius: scaledSize(50),
    alignSelf: "center",
    backgroundColor: "black",
  },
  buttonRate: {
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#6dff68",
    width: scaledSize(230),
    marginTop: scaledSize(60),
    marginBottom: scaledSize(30),
    height: scaledSize(50),
    borderRadius: scaledSize(50),
    alignSelf: "center",
    backgroundColor: "black",
  },
});
