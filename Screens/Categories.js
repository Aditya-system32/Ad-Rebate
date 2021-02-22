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
  BackHandler,
  FlatList,
  SafeAreaView,
} from "react-native";
import test from "../assets/images/test.jpg";
import { db } from "../firebases";
export default function CategoriesScreen({ navigation, route }) {
  const [value, setValue] = useState(route.params.paramKey);
  const [categorySelectedData, setCategorySelectedData] = useState();
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
  console.log(categorySelectedData);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <SafeAreaView style={styles.category}>
        <FlatList
          style={{ width: "100%", padding: 10 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          numColumns={1}
          data={categorySelectedData}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <TouchableNativeFeedback
                style={{ borderRadius: 20 }}
                background={TouchableNativeFeedback.Ripple("#464646")}
                onPress={() =>
                  navigation.navigate("AdsVideo", {
                    paramKey: item.id,
                  })
                }
              >
                <View style={styles.categoryTile}>
                  <Image
                    style={styles.clientImage}
                    source={{ uri: item.logo }}
                  ></Image>

                  <Text style={styles.categoryItemTitle}>{item.name}</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryItemTitle: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    flex: 1,
  },
  categoryTile: {
    backgroundColor: "rgba(50,50,50,0.2)",
    borderRadius: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  itemWrapper: {
    backgroundColor: "rgba(50,50,50,0.2)",
    borderRadius: 30,
    borderColor: "#2e2e2e",
    borderWidth: 0.5,
    overflow: "hidden",
    height: 85,
    width: "100%",
    flexDirection: "row",
    marginVertical: 7,
  },
  category: {
    width: "100%",
    alignSelf: "center",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
  },
  clientImage: {
    resizeMode: "cover",
    borderRadius: 100,
    width: 70,
    height: 70,
  },
  clientItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  clientName: {
    width: 100,
    color: "white",
    textAlign: "center",
    fontSize: 19,
    flex: 1,
    backgroundColor: "white",
  },
  clientsWrapper: {
    width: "90%",
    height: "90%",
    borderRadius: 20,
    padding: 17,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "column",
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
    width: "100%",
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
