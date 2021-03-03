import React from "react";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Dimensions, StatusBar, Share } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { useSelector } from "react-redux";
import { AuthContext } from "../routes/AuthProvider";

export default function BannerImages() {
  const { user } = useContext(AuthContext);
  const bannerData = useSelector((state) => state.bannerData.banners);
  const [shareMessage, setShareMessage] = useState(
    "https://play.google.com/store/apps/details?id=com.adverttonlineservices.adreabate" +
      "\n\nAd-Rebate\nAdvertisement On Your Control"
  );

  useEffect(() => {
    if (user) {
      setShareMessage(
        "https://play.google.com/store/apps/details?id=" +
          "com.adverttonlineservices.adreabate" +
          "\n\n" +
          "Ad-Rebate\n\n" +
          "Use My Referral Id to get Coupon\n\n" +
          "Referral Id - " +
          user.uid
      );
    }
  }, []);
  const onShare = async () => {
    if (bannerData.length) {
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
        images={bannerData == undefined ? bannerImages : bannerData}
        circleLoop={true}
        autoplay={true}
        resizeMode="contain"
        dotColor="#FFF"
        inactiveDotColor="#90A4AE"
        resizeMethod="auto"
        sliderBoxHeight={Dimensions.get("screen").height * 0.2}
        parentWidth={Dimensions.get("screen").width * 0.9}
        onCurrentImagePressed={onShare}
        ImageComponentStyle={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  image: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").width * 0.9,
  },
});
