import React from "react";
import { View, Text, StyleSheet, Image, Platform, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scaledSize } from "./Home";

const EssDetail = ({ name, ph, availability }) => {
  const openDialScreen = () => {
    let number = "";
    if (Platform.OS === "ios") {
      number = `telprompt:+91${ph}`;
    } else {
      number = `tel:+91${ph}`;
    }
    Linking.openURL(number);
  };
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.ph}>{"Phone : +91 " + ph}</Text>
      <Text style={styles.availability}>{availability}</Text>
      <TouchableOpacity onPress={openDialScreen} style={styles.button}>
        <View>
          <Text style={styles.text}>Call</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EssDetail;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#44BD41",
    height: scaledSize(40),
    width: scaledSize(120),
    borderRadius: 20,
    marginTop: scaledSize(20),
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 2,
    paddingTop: 2,
  },
  name: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginTop: scaledSize(10),
    fontSize: scaledSize(15),
  },
  availability: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginTop: scaledSize(5),
    fontSize: scaledSize(12),
  },
  ph: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
    marginTop: scaledSize(30),
    fontSize: scaledSize(12),
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    color: "white",
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
    backgroundColor: "#202020",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: scaledSize(8),
  },
});
