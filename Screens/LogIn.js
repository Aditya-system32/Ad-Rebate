import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  TextInput,
  BackHandler,
} from "react-native";
import { globalstyles } from "../styles/global";
import BannerImages from "./BannerImages";
import { scaledSize } from "./Home";
export default function LogInScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState("");

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

  //VALIDATION FOR THE PHONE NUMBER
  const checkingPhoneNumber = (phoneNumber) => {
    phoneNumber = phoneNumber.replace(".", "");
    if (
      phoneNumber.length != 10 ||
      phoneNumber.length == 0 ||
      isNaN(phoneNumber)
    ) {
      setPhoneNumber(phoneNumber);
      setDisabled(true);
      setErrorText("Enter the 10 digit number");
    } else {
      setPhoneNumber("+91" + phoneNumber);
      setDisabled(false);
      setErrorText(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalstyles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <View style={styles.banner}>
          <BannerImages />
        </View>
        <View style={styles.welcomeBackWrapper}>
          <Text style={styles.welcomeBack}>Welcome</Text>
          <Text style={styles.welcomeBack}>Back</Text>
        </View>
        <View>
          <TextInput
            style={styles.textinput}
            placeholder="Phone no."
            placeholderTextColor="#EDEDED"
            keyboardAppearance="dark"
            keyboardType="phone-pad"
            color="#fff"
            onChangeText={checkingPhoneNumber}
          ></TextInput>
          {<Text style={styles.erText}>{errorText}</Text>}
        </View>
        <View style={styles.loginWrapper}>
          <TouchableNativeFeedback
            useForeground={true}
            disabled={disabled}
            onPress={() =>
              navigation.navigate("Verification", {
                paramKey: phoneNumber,
              })
            }
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonTitle}>Login</Text>
            </View>
          </TouchableNativeFeedback>
          <View>
            <Text
              style={styles.registerHere}
              onPress={() => navigation.navigate("SignUp")}
            >
              New here ? Register
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  loginWrapper: {
    marginTop: scaledSize(70),
  },
  registerHere: {
    color: "#D3D3D3",
    alignSelf: "center",
    marginTop: scaledSize(10),
  },
  erText: {
    color: "red",
    width: "75%",
    alignSelf: "center",
    marginTop: -18,
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: scaledSize(178),
    borderRadius: scaledSize(20),
    height: scaledSize(58),
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: scaledSize(1),
  },
  loginButtonTitle: {
    color: "#ffffff",
    fontSize: scaledSize(18),
    fontFamily: "Poppins-Medium",
  },
  banner: {
    height: "20%",
    marginTop: scaledSize(5),
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "2%",
  },
  welcomeBackWrapper: {
    marginBottom: scaledSize(57),
    marginTop: scaledSize(57),
  },
  welcomeBack: {
    fontSize: scaledSize(28),
    fontFamily: "Poppins-Medium",
    color: "#EDEDED",
    alignSelf: "center",
    width: "80%",
  },
  textinput: {
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    borderWidth: scaledSize(1),
    borderRadius: scaledSize(20),
    paddingLeft: scaledSize(20),
    paddingRight: scaledSize(20),
    width: "80%",
    height: scaledSize(61),
    alignSelf: "center",
    fontSize: scaledSize(18),
    fontFamily: "Poppins-Regular",
    marginBottom: scaledSize(24),
  },
  textPassword: {
    marginBottom: scaledSize(16),
  },
  forgetPass: {
    color: "#fff",
    alignSelf: "center",
    width: "80%",
    margin: scaledSize(0),
    marginTop: scaledSize(10),
  },
});
