import React from "react";
import { useEffect, useState } from "react";
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

const deviceWidth = Dimensions.get("window").width;

export default function BannerImages(bannerImage) {
  const scrollRef = React.createRef();
  const [index, setIndex] = React.useState(0);
  const { bannerImages } = bannerImage;

  const settingIndex = (event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffset / viewSize);
    setIndex(index);
  };

  /*const autoScroll = () => {
    setInterval(() => {
      setIndex(
        (prev) => ({ index: prev.index + 1 }),
        () => {
          scrollRef.current.scrollTo({
            animated: true,
            y: 0,
            x: deviceWidth * index,
          });
        }
      );
    }, 3000);
  };*/

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={settingIndex}
        ref={autoScroll}
      >
        {bannerImages.map((bannerImage) => (
          <Image
            key={bannerImage}
            source={{ uri: bannerImage }}
            style={styles.bannerImage}
          />
        ))}
      </ScrollView>
      <View style={styles.circleDiv}>
        {bannerImages.map((bannerImage, i) => (
          <View
            key={bannerImage}
            style={[styles.whiteCircle, { opacity: i === index ? 1 : 0.5 }]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  bannerImage: {
    height: "100%",
    width: deviceWidth,
  },
  circleDiv: {
    width: "100%",
    position: "absolute",
    bottom: 15,
    height: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "#fff",
  },
});
