import "react-native-gesture-handler";
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  BackHandler,
  Share,
} from "react-native";
import { AuthContext } from "../routes/AuthProvider";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import BannerImages from "./BannerImages";
import { scaledSize } from "./Home";

export default function ReferScreen({ navigation }) {
  const [shareMessage, setShareMessage] = useState(
    "https://play.google.com/store/apps/details?id=com.adverttonlineservices.adrebate" +
      "\n\nAd-Rebate\nAdvertisement On Your Control"
  );
  const { user } = useContext(AuthContext);

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
    if (user) {
      setShareMessage(
        "https://play.google.com/store/apps/details?id=" +
          "com.adverttonlineservices.adrebate" +
          "\n\n" +
          "Ad-Rebate\n\n" +
          "Use My Referral Id to get Coupon\n\n" +
          "Referral Id - " +
          user.uid
      );
    }
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: shareMessage,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.banner}>
        <BannerImages />
      </View>

      <Text style={styles.text}>Your Referral ID</Text>
      <TextInput
        style={styles.textinput}
        color="#fff"
        value={user.uid}
      ></TextInput>
      <Text style={styles.text2}>
        1. Ask your friend to download the app and complete profile with your
        referral id.
      </Text>
      <Text style={styles.text2}>
        2. On successfull refers, both you and your friend will get a random
        coupon.
      </Text>
      <TouchableNativeFeedback onPress={onShare} style={styles.button}>
        <Text style={styles.buttonText}>Share</Text>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    marginBottom: scaledSize(20),
    marginTop: scaledSize(60),
    fontSize: scaledSize(20),
    fontFamily: "Poppins-SemiBold",
    alignSelf: "center",
  },
  text2: {
    color: "#dfdfdf",
    marginRight: scaledSize(10),
    marginBottom: scaledSize(10),
    fontSize: scaledSize(16),
    textAlign: "center",
    alignSelf: "center",
    paddingHorizontal: scaledSize(24),
    marginTop: scaledSize(10),
    fontFamily: "Poppins-Regular",
  },
  banner: {
    height: "20%",
    marginTop: scaledSize(5),
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "2%",
  },
  buttonText: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    fontSize: scaledSize(16),
    fontFamily: "Poppins-Regular",
  },
  gtt: {
    color: "#fff",
    marginRight: scaledSize(10),
    fontSize: scaledSize(16),
    fontFamily: "Poppins-Regular",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: scaledSize(150),
    borderRadius: scaledSize(20),
    marginBottom: scaledSize(50),
    marginTop: scaledSize(40),
    height: scaledSize(58),
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
  },
  textinput: {
    marginTop: scaledSize(10),
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    borderWidth: 1,
    borderRadius: scaledSize(20),
    paddingLeft: scaledSize(20),
    paddingRight: scaledSize(20),
    width: "80%",
    height: scaledSize(61),
    alignSelf: "center",
    textAlign: "center",
    fontSize: scaledSize(15),
    fontFamily: "Poppins-Regular",
    marginBottom: scaledSize(24),
  },
  erText: {
    color: "#ff7474",
    width: "75%",
    fontFamily: "Poppins-Regular",
    height: scaledSize(40),
    textAlign: "center",
    alignSelf: "center",
    marginTop: -scaledSize(10),
  },
  picker: {
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    color: "#f3f3f3",
    borderWidth: scaledSize(1),
    borderRadius: scaledSize(20),
    paddingLeft: scaledSize(20),
    paddingTop: scaledSize(5),
    width: "80%",
    height: scaledSize(61),
    alignSelf: "center",
    fontSize: scaledSize(12),
    fontFamily: "Poppins-Regular",
    marginBottom: scaledSize(24),
  },
  pickerItem: {
    color: "white",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#252525",
    borderRadius: scaledSize(10),
    width: "80%",
    height: scaledSize(50),
    textAlign: "center",
    marginBottom: scaledSize(10),
  },
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
