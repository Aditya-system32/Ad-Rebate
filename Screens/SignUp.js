import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import CheckBox from "@react-native-community/checkbox";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  TextInput,
  BackHandler,
  TouchableNativeFeedback,
  Linking,
} from "react-native";
import BannerImages from "./BannerImages";
import { scaledSize } from "./Home";

export default function SignUpScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [checkboxes, setCheckBoxes] = useState(false);
  const [flagPhoneNumber, setFlagPhoneNumber] = useState(false);
  const [flagCheckBox, setFlagCheckBox] = useState(false);

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
      setFlagPhoneNumber(false);
    } else {
      setPhoneNumber("+91" + phoneNumber);
      setErrorText(null);
      if (flagCheckBox == true) {
        setDisabled(false);
      }
      setFlagPhoneNumber(true);
    }
  };
  const checkingCheckBoxes = () => {
    if (checkboxes) {
      setDisabled(true);
      setErrorText("Please Select The Box");
      setCheckBoxes(false);
      setFlagCheckBox(false);
    } else {
      if (flagPhoneNumber == true) {
        setDisabled(false);
      }
      setCheckBoxes(true);
      setFlagCheckBox(true);
    }
  };

  //Link to Terms and Conditions Page
  const handleTermsAndConditions = () => {
    Linking.openURL("http://adrebate.ml/");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <View style={styles.banner}>
          <BannerImages />
        </View>
        <View style={styles.welcomeBackWrapper}>
          <Text style={styles.welcomeBack}>Create</Text>
          <Text style={styles.welcomeBack}>Account</Text>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Phone no."
          placeholderTextColor="#EDEDED"
          keyboardType="phone-pad"
          color="#fff"
          onChangeText={checkingPhoneNumber}
        ></TextInput>
        {<Text style={styles.erText}>{errorText}</Text>}
        <View style={styles.termsCondition}>
          <CheckBox
            tintColors={{ true: "#F15927", false: "#Fff" }}
            value={checkboxes}
            onValueChange={checkingCheckBoxes}
          />
          <Text style={styles.forgetPass} onPress={handleTermsAndConditions}>
            Agree to terms and conditions
          </Text>
        </View>
        <View style={styles.loginWrapper}>
          <TouchableNativeFeedback
            disabled={disabled}
            useForeground={true}
            onPress={() =>
              navigation.navigate("Verification", {
                paramKey: phoneNumber,
              })
            }
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonTitle}>Register</Text>
            </View>
          </TouchableNativeFeedback>
          <View>
            <Text
              style={styles.registerHere}
              onPress={() => navigation.navigate("LogIn")}
            >
              Already a user? Login
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  termsCondition: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
  },
  erText: {
    color: "red",
    width: "75%",
    alignSelf: "center",
    marginTop: -18,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loginWrapper: {
    marginTop: scaledSize(40),
  },
  registerHere: {
    color: "#D3D3D3",
    alignSelf: "center",
    marginTop: scaledSize(10),
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(15),
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
    borderWidth: 1,
  },
  loginButtonTitle: {
    color: "#ffffff",
    fontSize: scaledSize(18),
    fontFamily: "Poppins-Medium",
  },
  banner: {
    height: "20%",
    marginTop: 5,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "2%",
  },
  welcomeBackWrapper: {
    marginBottom: scaledSize(45),
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
    borderWidth: 1,
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
  forgetPass: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Poppins-Regular",
    width: "80%",
    margin: 0,
    fontSize: scaledSize(15),
  },
});
