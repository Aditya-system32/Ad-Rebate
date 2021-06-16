import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  ToastAndroid,
  Linking,
} from "react-native";
import { AuthContext } from "../routes/AuthProvider";
import { db } from "../firebases";
import { scaledSize } from "./Home";

const ClothesCategory = ({ navigation }) => {
  const clothes = [
    {
      id: "1",
      img: "mens",
      name: "Mens",
    },
    {
      id: "2",
      img: "womens",
      name: "Women",
    },
    {
      id: "3",
      img: "kids",
      name: "Kids",
    },
  ];
  const { userData, user } = useContext(AuthContext);
  const [clothesCategories, setClothesCategories] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getCategory();
    async function getCategory() {
      setloading(true);
      const categoryData = db
        .collection("ClothesCategories")
        .doc("78MK9ub3eUKjgH3h1sVn");
      categoryData
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setClothesCategories(doc.data()[userData.location]);
            setloading(false);
          } else {
            setloading(false);
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, []);
  //console.log(clothesCategories);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <View>
          <FlatList
            style={{ width: "95%", alignSelf: "center" }}
            data={clothesCategories}
            key={(index) => index}
            numColumns={2}
            contentContainerStyle={{ alignItems: "center" }}
            renderItem={({ item }) => {
              return (
                <TouchableNativeFeedback
                  onPress={() =>
                    navigation.navigate("Categories", {
                      paramKey: item.value,
                    })
                  }
                >
                  <View
                    style={{
                      width: 160,
                      height: 170,
                      borderWidth: 1,
                      borderColor: "white",
                      margin: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Image
                      source={{
                        uri: item.img,
                      }}
                      style={{ width: 160, height: 170, borderRadius: 5 }}
                    />
                  </View>
                </TouchableNativeFeedback>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ClothesCategory;

const styles = StyleSheet.create({
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
