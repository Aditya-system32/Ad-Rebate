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
  Share,
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
  const { bannerData, user } = useContext(AuthContext);
  const [shareMessage, setShareMessage] = useState("Play Store Link");

  useEffect(() => {
    if (user) {
      setShareMessage(
        "Ad-Rebate\n\nReferral Id - \n" +
          user.uid +
          "\n\nuse this Id to get Coupon\n\n" +
          "https://play.google.com/store/apps/details?id=" +
          "appPackageName"
      );
    }
  }, []);
  const onShare = async (index) => {
    if (index == 5) {
      try {
        const result = await Share.share({
          message: shareMessage,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <SliderBox
        images={bannerData == undefined ? bannerImages : bannerData.banners}
        circleLoop={true}
        autoplay={true}
        resizeMode="cover"
        dotColor="#FFF"
        inactiveDotColor="#90A4AE"
        onCurrentImagePressed={onShare}
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
