import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import BannerImages from "./BannerImages";
import { scaledSize } from "./Home";
export default function GiftCoupon({ navigation }) {
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
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <BannerImages />
      </View>
      <Text style={styles.text}>Enter Your Coupon Code</Text>
      <TextInput style={styles.textinput} color="#fff"></TextInput>
      <TouchableNativeFeedback
        onPress={() => console.log("press")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Activate Coupon</Text>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  banner: {
    height: "20%",
    marginTop: scaledSize(5),
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "2%",
  },
  text: {
    color: "#fff",
    marginBottom: scaledSize(20),
    marginTop: scaledSize(60),
    fontSize: scaledSize(20),
    fontFamily: "Poppins-SemiBold",
    alignSelf: "center",
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
  buttonText: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    fontSize: scaledSize(16),
    fontFamily: "Poppins-Regular",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: scaledSize(160),
    borderRadius: scaledSize(20),
    marginTop: scaledSize(50),
    height: scaledSize(58),
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
  },
});
