import "react-native-gesture-handler";
import React, { useState } from "react";
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

export default function LogInScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState("");

  BackHandler.addEventListener("hardwareBackPress", function () {
    navigation.pop();
    return true;
  });

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
    marginTop: 70,
  },
  registerHere: {
    color: "#D3D3D3",
    alignSelf: "center",
    marginTop: 10,
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
    width: 178,
    borderRadius: 20,
    height: 58,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
  },
  loginButtonTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  banner: {
    height: "16%",
    backgroundColor: "#000000",
    width: "100%",
    marginBottom: "2%",
  },
  welcomeBackWrapper: {
    marginBottom: 57,
    marginTop: 57,
  },
  welcomeBack: {
    fontSize: 28,
    fontFamily: "Poppins-Medium",
    color: "#EDEDED",
    alignSelf: "center",
    width: "80%",
  },
  textinput: {
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "80%",
    height: 61,
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    marginBottom: 24,
  },
  textPassword: {
    marginBottom: 16,
  },
  forgetPass: {
    color: "#fff",
    alignSelf: "center",
    width: "80%",
    margin: 0,
    marginTop: 10,
  },
});
