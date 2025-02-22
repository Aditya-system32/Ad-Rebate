import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../firebases";
import EssDetail from "./EssDetail";
import EssMed from "./EssMed";

function EssentialsCategory({ navigation, route }) {
  const { category } = route.params;
  const [array, setArray] = useState([]);
  const medi = ["Ambulance", "Oxygen", "Rtpcr"];
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
  useEffect(() => {
    let cat = JSON.parse(JSON.stringify(category));
    if (
      category === "oxygen" ||
      category === "ambulance" ||
      category === "rtpcr"
    ) {
      cat = "Medical";
    }
    db.collection("Essentials")
      .doc(cat)
      .get()
      .then((doc) => {
        let data = doc.data();

        if (
          category === "oxygen" ||
          category === "ambulance" ||
          category === "rtpcr"
        ) {
          setArray(data[category]);
        } else {
          setArray(data.items);
        }
      });
  }, [category]);
  return (
    <View>
      {category !== "Medical" ? (
        <FlatList
          data={array}
          keyExtractor={(item) => item.number}
          numColumns={2}
          renderItem={({ item }) => (
            <EssDetail
              name={item.name}
              ph={item.number}
              availability={item.availability}
            ></EssDetail>
          )}
        ></FlatList>
      ) : (
        <FlatList
          data={medi}
          keyExtractor={(item) => item}
          numColumns={2}
          renderItem={({ item }) => (
            <EssMed text={item} navigation={navigation}></EssMed>
          )}
        ></FlatList>
      )}
    </View>
  );
}
//         onPress={() => navigation.navigate("EssentialsDetails")}
export default EssentialsCategory;
