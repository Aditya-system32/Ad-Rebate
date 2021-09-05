import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scaledSize } from "./Home";

const EssMed = ({ navigation, text }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EssentialsCategory", {
          category: text.toLowerCase(),
        })
      }
      style={styles.card}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default EssMed;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    fontSize: scaledSize(15),
  },
  card: {
    width: scaledSize(190),
    height: scaledSize(230),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: scaledSize(8),
    backgroundColor: "#202020",
    paddingTop: 5,
  },
});
