import React from "react";
import { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  FlatList,
  Animated,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { AuthContext } from "../routes/AuthProvider";

const bannerImages = [
  "https://i.ibb.co/0DBMMw6/sam-moqadam-W8-Cyjblr-F8-U-unsplash.jpg",
  "https://i.ibb.co/dGwGN37/clem-onojeghuo-NT3q-P7-Wbmz-E-unsplash.jpg",
  "https://i.ibb.co/fv933B7/sharon-mccutcheon-8a5e-J1-mm-Q-unsplash.jpg",
  "https://i.ibb.co/G3vpZ0S/maximilian-bruck-4-SKd-Rc-Y13j4-unsplash.jpg",
];

export default function BannerImages() {
  const { bannerData } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <SliderBox
        images={bannerData == undefined ? bannerImages : bannerData.banners}
        circleLoop="true"
        autoplay="true"
        resizeMode="cover"
        dotColor="#FFF"
        inactiveDotColor="#90A4AE"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
