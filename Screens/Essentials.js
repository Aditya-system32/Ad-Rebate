import React, { useEffect } from "react";
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
import hospitalicon from "../assets/images/hospital.png";
import vegitableicon from "../assets/images/veggi.png";
import tiffin from "../assets/images/tiffin.png";
import grocery from "../assets/images/grocery.png";
import EssCard from "./EssCard";

function Essentials({ navigation }) {
  const array = [
    { color: "#43A4BA", text: "Grocery", img: grocery },
    { color: "#FF9B9B", text: "Medical", img: hospitalicon },
    { color: "#7D5DD8", text: "Tiffin", img: tiffin },
    { color: "#44BD41", text: "Vegetables", img: vegitableicon },
  ];
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
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
