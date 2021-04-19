import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scaledSize } from "./Home";

const EssCard = ({ navigation, text, img, color }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EssentialsCategory", { category: text })
      }
      style={[styles.card, { backgroundColor: color }]}
    >
      <Image style={styles.img} source={img}></Image>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default EssCard;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginTop: scaledSize(40),
    fontSize: scaledSize(15),
  },
  img: {
    resizeMode: "contain",
    width: scaledSize(130),
    height: scaledSize(130),
  },
  card: {
    width: scaledSize(190),
    height: scaledSize(230),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: scaledSize(8),
  },
});
