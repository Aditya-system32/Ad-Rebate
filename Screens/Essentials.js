import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { db } from "../firebases";
import coupons from "../assets/svgs/coupons.png";
import EssCard from "./EssCard";

function Essentials({ navigation }) {
  const array = [
    { color: "#43A4BA", text: "Grocery", img: coupons },
    { color: "#FF9B9B", text: "Medical", img: coupons },
    { color: "#7D5DD8", text: "Tiffin", img: coupons },
    { color: "#44BD41", text: "Vegetables", img: coupons },
  ];
  return (
    <View style={styles.cardHolder}>
      <FlatList
        data={array}
        keyExtractor={(item) => item.text}
        numColumns={2}
        renderItem={({ item }) => (
          <EssCard
            navigation={navigation}
            img={item.img}
            color={item.color}
            text={item.text}
          ></EssCard>
        )}
      ></FlatList>
    </View>
  );
}
//
export default Essentials;

const styles = StyleSheet.create({});
