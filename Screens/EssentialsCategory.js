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

function EssentialsCategory({ navigation, route }) {
  const { category } = route.params;
  const [array, setArray] = useState([]);
  const [medi, setMedi] = useState([]);
  useEffect(() => {
    db.collection("Essentials")
      .doc(category)
      .get()
      .then((doc) => {
        if (category === "Medical") setMedi(doc.data());
        else {
          setArray(doc.data().items);
        }
      });
  }, []);
  return (
    <View>
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
    </View>
  );
}
//         onPress={() => navigation.navigate("EssentialsDetails")}
export default EssentialsCategory;
