import "react-native-gesture-handler";
import React from "react";
import { Button, View, TextInput, StyleSheet, StatusBar } from "react-native";
import { db } from "../firebases";

export default function ProfileScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState("");

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

  const shareCouponChecking = async () => {
    const tempUser = [];
    db.collection("Users")
      .where(phone, "==", phoneNumber)
      .get()
      .then((res) => {
        res.forEach((user) => {
          tempUser.push(user.data());
        });
        console.log(tempUser);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
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
      <Button title="Share" onPress={shareCouponChecking} />
      <Button title="Go Home" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  erText: {
    color: "red",
    width: "75%",
    alignSelf: "center",
    marginTop: -18,
  },
});
