import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { db } from "../firebases";

export default function CategoriesScreen({ navigation, route }) {
  const [value, setValue] = useState(route.params.paramKey);
  const [categorySelectedData, setCategorySelectedData] = useState();

  useEffect(() => {
    if (true) {
      const categoryData = db.collection("Categories").doc(value);
      categoryData
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setCategorySelectedData(doc.data().clients);
          } else {
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, []);

  if (categorySelectedData == undefined) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text>{value}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
});
