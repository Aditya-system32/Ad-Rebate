import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, BackHandler } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import coupons from "../assets/images/couponcolor.png";
import thank from "../assets/images/thank.png";
import enjoy from "../assets/images/enjoy.png";
import { scaledSize } from "./Home";
export default function AppIntroSliders({ navigation }) {
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
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#000000",
          image: <Image style={styles.image} source={thank} />,
          title: "Thank you for downloading Ad-Rebate.",
          subtitle:
            "We at Ad-Rebate, believe in providing our customers with benefits they can get by investing the least amount of time.",
        },
        {
          backgroundColor: "#000000",
          image: <Image style={styles.image} source={coupons} />,
          title: "Getting coupons",
          subtitle:
            "1: Select your favorite cafe/restaurant/hotel etc. \n2: Watch ads displayed on your screen. \n3: You'll be asked 1 question related to ads you just saw.\n4: After selecting the correct answer you'll get your desired coupon. (to protect spam, you can use the coupon after 1 hour.)",
        },
        {
          backgroundColor: "#000000",
          image: <Image style={styles.image} source={enjoy} />,
          title: "Redeeming a coupon",
          subtitle:
            "1: Scan barcode at our partners venue \n2: Select coupon from drop down and enter your bill. \n3: After successfull redemption show your app screen at counter\n4: Pay the final bill shown in the app",
        },
      ]}
      onDone={() => navigation.popToTop()}
      onSkip={() => navigation.popToTop()}
      containerStyles={styles.container}
      imageContainerStyles={styles.imageContainer}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: scaledSize(20),
    paddingHorizontal: scaledSize(10),
    marginTop: scaledSize(60),
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(15),
    paddingHorizontal: scaledSize(30),
    textAlign: "left",
    lineHeight: scaledSize(25),
    marginTop: scaledSize(20),
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    padding: 0,
    position: "absolute",
  },
  image: {
    height: scaledSize(200),
    width: scaledSize(200),
    resizeMode: "contain",

    position: "absolute",
    alignSelf: "center",
    marginTop: scaledSize(80),
    top: 0,
  },
  container: {
    width: "100%",
    position: "relative",
    height: "100%",
  },
});
