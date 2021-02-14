import React, { useState } from "react";
import { StyleSheet, View, Text, Image, BackHandler } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function AppIntroSliders({ navigation }) {
  BackHandler.addEventListener("hardwareBackPress", function () {
    navigation.popToTop();
    return true;
  });
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#000000",
          image: <Image source={require("../assets/images/coffee.png")} />,
          title: "Onboarding",
          subtitle:
            "Done with asdddddddddddddddddddddddddddddddddddddddddddddddddddwqeqdasdadsReact Native Onboarding Swiawqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqeeeper",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/images/coffee.png")} />,
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/images/coffee.png")} />,
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
      onDone={() => navigation.popToTop()}
      onSkip={() => navigation.popToTop()}
    />
  );
}
