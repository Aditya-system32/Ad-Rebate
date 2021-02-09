import "react-native-gesture-handler";
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Alert,
  StatusBar,
  SafeAreaView,
} from "react-native";
import * as Notifications from "expo-notifications";
import TextTicker from "react-native-text-ticker";
import { globalstyles } from "../styles/global";
import cash from "../assets/svgs/cash.png";
import coffee from "../assets/images/coffee.png";
import coupons from "../assets/svgs/coupons.png";
import { AuthContext } from "../routes/AuthProvider";
import { db } from "../firebases";
import BannerImages from "./BannerImages";
import { FlatList } from "react-native-gesture-handler";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function HomeScreen({ navigation }) {
  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );
  const [pushnotification, setPushNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotifiaction] = useState();
  const [categoriesButtons, setCategoriesButtons] = useState([
    {
      name: "Cafe",
      value: "cafe",
      img: "../assests/images/coffee.jpg",
      key: "1",
    },
    {
      name: "Clothing",
      value: "clothing",
      img: "../assests/images/coffee.jpg",
      key: "2",
    },
    {
      name: "Electronics",
      value: "electronics",
      img: "../assests/images/coffee.jpg",
      key: "3",
    },
    {
      name: "Salon",
      value: "salon",
      img: "../assests/images/coffee.jpg",
      key: "4",
    },
    {
      name: "Restaurant",
      value: "restaurant",
      img: "../assests/images/coffee.jpg",
      key: "5",
    },
  ]);

  //TAKING THE USER DATA FROM DATABASE
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    checkUser();
    async function checkUser() {
      if (user !== null && isMounted) {
        const userDoc = db.collection("Users").doc(user.uid);
        userDoc
          .get()
          .then(function (doc) {
            if (doc.exists) {
              setUserData(doc.data());
            } else {
              navigation.navigate("ProfileComplete");
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //NOTIFICATION BAR IN THE HOME SCREEN
  useEffect(() => {
    let isMounted = true;
    const noti = db.collection("Notification").doc("notifications");
    noti
      .get()
      .then(function (doc) {
        if (doc.exists && isMounted) {
          setNotifiaction(doc.data().notification);
        } else {
          //navigation.navigate("ProfileComplete");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //TAKING THE BANNERS DATA FROM DATABASE
  useEffect(() => {
    let isMounted = true;
    if (true) {
      const bannerDoc = db
        .collection("Banners")
        .doc(
          userData == undefined
            ? "bhilai"
            : userData.location == null || userData.location === ""
            ? "bhilai"
            : userData.location
        );
      bannerDoc
        .get()
        .then(function (doc) {
          if (doc.exists && isMounted) {
            setBannerData(doc.data());
          } else {
            // console.log("error");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // This listener is fired when user receive notification
  notificationListener.current = Notifications.addNotificationReceivedListener(
    (notification) => {
      setPushNotification(notification);
    }
  );

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  responseListener.current = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      console.log(response);
    }
  );

  //EARNING THE UPDATE ALERT
  const buttonAlert = () =>
    Alert.alert(
      "Update Alert",
      "This section will be available soon!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK" },
      ],
      { cancelable: false }
    );

  return (
    <View style={globalstyles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.banner}>
        <BannerImages />
      </View>
      {notification === null ||
      notification === "" ||
      notification === undefined ? null : (
        <View>
          <TextTicker
            style={{ fontSize: 24, color: "white" }}
            duration={3000}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={1000}
          >
            {notification}
          </TextTicker>
        </View>
      )}
      <View style={styles.location}>
        <Text style={styles.locationText}>Current location : Bhilai</Text>
      </View>
      <View style={styles.wrapper}>
        <TouchableNativeFeedback onPress={buttonAlert}>
          <View style={styles.card}>
            <Image source={cash}></Image>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => navigation.navigate("Coupon")}>
          <View style={styles.card}>
            <Image source={coupons}></Image>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.categoryWrapper}>
        <Text style={styles.categoryHeading}>Categories</Text>
        <View>
          <SafeAreaView style={styles.categoryItems}>
            <FlatList
              style={styles.category}
              data={categoriesButtons}
              numColumns={4}
              renderItem={({ item }) => (
                <View style={styles.itemWrapper}>
                  <TouchableNativeFeedback
                    onPress={() =>
                      user
                        ? navigation.navigate("Categories", {
                            paramKey: item.value,
                          })
                        : alert("Login First")
                    }
                  >
                    <View style={styles.categoryTile}>
                      <Image style={styles.tileLogo} source={coffee}></Image>
                    </View>
                  </TouchableNativeFeedback>
                  <Text style={styles.categoryItemTitle}>{item.name}</Text>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
      </View>

      {!user ? (
        <View style={styles.buttonWrapper}>
          <TouchableNativeFeedback
            useForeground={true}
            onPress={() => navigation.navigate("LogIn")}
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonTitle}>Login</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("SignUp")}
          >
            <View style={styles.registerButton}>
              <Text style={styles.registerButtonTitle}>Register</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryItemTitle: { color: "white" },
  itemWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  tileLogo: { width: 40, height: 40 },
  categoryItems: {
    flexDirection: "row",
    width: 383,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "blue",
    height: "100%",
    flexWrap: "wrap",
  },
  categoryTile: {
    borderRadius: 50,
    height: 70,
    backgroundColor: "#9c9c9c",
    borderColor: "#000000",
    borderWidth: 2,
    width: 70,
    margin: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonTitle: {
    color: "#000",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  loginButtonTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 178,
    borderRadius: 20,
    height: 58,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
  },
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 178,
    borderRadius: 20,
    height: 58,
    backgroundColor: "#00BEB3",
  },
  categoryHeading: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: "2%",
  },
  category: {
    backgroundColor: "#161616",
    padding: 20,
    width: 383,
    flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 20,
    alignSelf: "center",
    height: "100%",
  },
  categoryWrapper: {
    marginBottom: "14%",
    height: "38%",
    alignSelf: "center",
  },
  locationText: {
    marginBottom: "2%",
    marginLeft: "5%",
    fontFamily: "Poppins-Regular",
    color: "#A1A1A1",
    fontSize: 14,
  },
  banner: {
    height: "16%",
    backgroundColor: "#70007a",
    width: "100%",
    marginBottom: "2%",
  },
  wrapper: {
    marginBottom: "2%",
    flexDirection: "row",
    height: "20%",
    width: "100%",
    justifyContent: "space-evenly",
  },
  card: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FF005C",
    height: "100%",
  },
  cashCard: { backgroundColor: "#2bff00" },
  texts: {
    borderRadius: 20,
    fontFamily: "Poppins-Medium",
    fontSize: 50,
    color: "#fff",
  },
});
