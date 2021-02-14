import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  TouchableNativeFeedback,
} from "react-native";
import test from "../assets/images/test.jpg";
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
            //console.log(doc.data().clients);
            setCategorySelectedData(doc.data().clients);
          } else {
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, []);
  //console.log(categorySelectedData);
  if (categorySelectedData == undefined) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.clientsWrapper}>
        {categorySelectedData.map((name) => {
          return (
            <View style={styles.clientItem} key={name.id}>
              <TouchableNativeFeedback
                onPress={() =>
                  navigation.navigate("AdsVideo", {
                    paramKey: name.id,
                  })
                }
              >
                <View style={styles.registerButton}>
                  <Image style={styles.clientImage} source={test}></Image>
                </View>
              </TouchableNativeFeedback>
              <Text style={styles.clientName} key={name.id}>
                {name.name}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  clientImage: {
    flex: 1,
    resizeMode: "contain",
    borderRadius: 100,
    width: "100%",
    height: "100%",
  },
  clientItem: {
    alignItems: "center",
  },
  clientName: { width: 100, color: "white", textAlign: "center" },
  clientsWrapper: {
    width: "90%",
    height: "90%",
    borderRadius: 20,
    padding: 17,
    backgroundColor: "#0f0f0f",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  registerButtonTitle: {
    color: "#000",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 100,
    height: 100,
    margin: 6,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000",
  },
});
