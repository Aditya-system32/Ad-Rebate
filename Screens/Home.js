import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Alert,
  StatusBar,
} from "react-native";
import { globalstyles } from "../styles/global";
import cash from "../assets/svgs/cash.png";
import coupons from "../assets/svgs/coupons.png";
import { AuthContext } from "../routes/AuthProvider";
import { db } from "../firebases";
import BannerImages from "./BannerImages";

export default function HomeScreen({ navigation }) {
  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );

  //TAKING THE USER DATA FROM DATABASE
  useEffect(() => {
    if (user) {
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
  }, []);

  //TAKING THE BANNERS DATA FROM DATABASE
  useEffect(() => {
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
          if (doc.exists) {
            setBannerData(doc.data());
          } else {
            console.log("error");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, []);
  const buttonAlert = () =>
    Alert.alert(
      "Update Alert",
      "This section is available on future",
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
        <View style={styles.category}>
          <View style={styles.categoryItem}>
            <Image></Image>
            <Text>xyz</Text>
          </View>
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
    width: 383,
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
