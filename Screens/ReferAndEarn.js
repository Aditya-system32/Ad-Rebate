import "react-native-gesture-handler";
import React, { useState, useContext, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
  BackHandler,
  Share,
  ActivityIndicator,
} from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import BannerImages from "./BannerImages";

export default function ReferScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [shareUser, setShareUser] = useState();
  const [shareMessage, setShareMessage] = useState("Play Store Link");
  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );

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
        "Ad-Rebate\n\nReferral Id - \n" +
          user.uid +
          "\n\nuse this Id to get Coupon\n\n" +
          "https://play.google.com/store/apps/details?id=" +
          "com.adrebate.adreabate"
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
    marginBottom: 20,
    marginTop: 100,
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    alignSelf: "center",
  },
  text2: {
    color: "#dfdfdf",
    marginRight: 10,
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    paddingHorizontal: 24,
    marginTop: 10,
    fontFamily: "Poppins-Regular",
  },
  banner: {
    height: "16%",
    backgroundColor: "#000000",
    width: "100%",
    marginBottom: "2%",
  },
  buttonText: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  gtt: {
    color: "#fff",
    marginRight: 10,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 150,
    borderRadius: 20,
    marginBottom: 50,
    marginTop: 40,
    height: 58,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
  },
  textinput: {
    marginTop: 10,
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "80%",
    height: 61,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    marginBottom: 24,
  },
  erText: {
    color: "#ff7474",
    width: "75%",
    fontFamily: "Poppins-Regular",
    height: 40,
    textAlign: "center",
    alignSelf: "center",
    marginTop: -10,
  },
  picker: {
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    color: "#f3f3f3",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingTop: 5,
    width: "80%",
    height: 61,
    alignSelf: "center",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginBottom: 24,
  },
  pickerItem: {
    color: "white",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#252525",
    borderRadius: 10,
    width: "80%",
    height: 50,
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    backgroundColor: "black",
    height: "100%",
  },
});
