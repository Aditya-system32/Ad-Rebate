import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import {
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
import { View as MotiView } from "moti";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";
import { scaledSize } from "./Home";
export default function CategoriesScreen({ navigation, route }) {
  const { userData, user } = useContext(AuthContext);
  const [value, setValue] = useState(route.params.paramKey);
  const [categorySelectedData, setCategorySelectedData] = useState([]);
  const [loading, setloading] = useState(false);
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
    getCategory();
    async function getCategory() {
      setloading(true);
      const categoryData = db.collection("Categories").doc(value);
      categoryData
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setCategorySelectedData(doc.data()[userData.location]);
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <SafeAreaView style={styles.category}>
          {categorySelectedData.length === 0 ? (
            <Text style={styles.err}>
              {`This category is not available in your city yet\n( coming soon.... )`}
            </Text>
          ) : (
            <FlatList
              style={{ width: "100%", padding: 10 }}
              contentContainerStyle={{ paddingBottom: 20 }}
              numColumns={1}
              data={categorySelectedData}
              renderItem={({ item }) => (
                <MotiView
                  from={{
                    opacity: 0,
                    translateX: -50,
                  }}
                  animate={{
                    opacity: 1,
                    translateX: 0,
                  }}
                  style={styles.itemWrapper}
                >
                  <TouchableNativeFeedback
                    style={{ borderRadius: 20 }}
                    background={TouchableNativeFeedback.Ripple("#464646")}
                    onPress={() => {
                      navigation.navigate("Details", {
                        id: item.id,
                        name: item.name,
                        category: value,
                        logo: item.logo,
                      });
                      // navigation.navigate("AdsVideo", {
                      //   paramKey: item.id,
                      //   categ: value,
                      // });
                    }}
                  >
                    <View style={styles.categoryTile}>
                      <Image
                        style={styles.clientImage}
                        source={{ uri: item.logo }}
                      ></Image>

                      <Text style={styles.categoryItemTitle}>{item.name}</Text>
                    </View>
                  </TouchableNativeFeedback>
                </MotiView>
              )}
            />
          )}
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  err: {
    color: "#ff6d6d",
    fontFamily: "Poppins-Regular",
    paddingHorizontal: scaledSize(20),
    lineHeight: scaledSize(30),
    textAlign: "center",
  },
  categoryItemTitle: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(15),
    flex: 1,
  },
  categoryTile: {
    backgroundColor: "rgba(50,50,50,0.2)",
    borderRadius: scaledSize(30),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: scaledSize(20),
  },
  itemWrapper: {
    backgroundColor: "rgba(50,50,50,0.2)",
    borderRadius: scaledSize(30),
    borderColor: "#2e2e2e",
    borderWidth: 0.5,
    overflow: "hidden",
    height: scaledSize(85),
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
    paddingVertical: scaledSize(10),
  },
  clientImage: {
    resizeMode: "cover",
    borderRadius: scaledSize(100),
    width: scaledSize(70),
    height: scaledSize(70),
  },
  clientItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  clientName: {
    width: scaledSize(100),
    color: "white",
    textAlign: "center",
    fontSize: scaledSize(19),
    flex: 1,
    backgroundColor: "white",
  },
  clientsWrapper: {
    width: "90%",
    height: "90%",
    borderRadius: scaledSize(20),
    padding: 17,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  registerButtonTitle: {
    color: "#000",
    fontSize: scaledSize(18),
    fontFamily: "Poppins-Medium",
  },
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
    width: scaledSize(100),
    borderRadius: scaledSize(100),
    height: scaledSize(100),
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
