import "react-native-gesture-handler";
import React, { useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  TextInput,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import BannerImages from "./BannerImages";
import { Checkbox } from "react-native-paper";
import { set } from "react-native-reanimated";

export default function SignUpScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [checkboxes, setCheckBoxes] = useState(false);
  const [flagPhoneNumber, setFlagPhoneNumber] = useState(false);
  const [flagCheckBox, setFlagCheckBox] = useState(false);
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
        <View>
          <TextInput
            style={styles.textinput}
            placeholder="Phone no."
            placeholderTextColor="#EDEDED"
            keyboardType="phone-pad"
            color="#fff"
            onChangeText={checkingPhoneNumber}
          ></TextInput>
          {<Text style={styles.erText}>{errorText}</Text>}
        </View>
        <View style={styles.termsCondition}>
          <CheckBox
            tintColors={{ true: "#F15927", false: "#Fff" }}
            value={checkboxes}
            onValueChange={checkingCheckBoxes}
          />
          <Text style={styles.forgetPass}>Agree to terms and conditions</Text>
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
    marginTop: 70,
  },
  registerHere: {
    color: "#D3D3D3",
    alignSelf: "center",
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
    backgroundColor: "#70007a",
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
  forgetPass: {
    color: "#fff",
    alignSelf: "center",
    width: "80%",
    margin: 0,
  },
});
