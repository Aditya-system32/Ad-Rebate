import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  ToastAndroid,
  TouchableNativeFeedback,
  ScrollView,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";
function RegisterWithUs() {
  const { user } = useContext(AuthContext);
  /* useEffect(() => {
    db.collection("ContactRequests").doc(user.uid).set({name:fullName,category:category,number:user.phoneNumber},{merge:true})
  });*/

  const submit = () => {
    db.collection("ContactRequests")
      .doc(user.uid)
      .set(
        { name: fullName, category: category, number: user.phoneNumber },
        { merge: true }
      )
      .catch((err) => {
        console.log(err);
      });
    ToastAndroid.show("Your Response is Submitted", ToastAndroid.SHORT);
  };
  const [fullName, setFullName] = useState("");
  const [category, setCategory] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View style={styles.welcomeBackWrapper}>
        <Text style={styles.welcomeBack}>
          Category You Want To Register With Us
        </Text>
      </View>
      <ScrollView>
        <View>
          <TextInput
            style={styles.textinput}
            placeholder="Full Name"
            placeholderTextColor="#EDEDED"
            color="#fff"
            onChangeText={(text) => setFullName(text)}
          ></TextInput>
        </View>

        <View>
          <TextInput
            style={styles.textinput}
            placeholder="Category"
            placeholderTextColor="#EDEDED"
            color="#fff"
            onChangeText={(referralId) => setCategory(referralId)}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={submit} style={styles.ProfileCompleteButton}>
          <Text style={styles.ProfileCompleteButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    color: "#ffffff",
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
  ProfileCompleteWrapper: {
    marginTop: 10,
  },
  ProfileCompleteButton: {
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
  ProfileCompleteButtonTitle: {
    color: "#ffffff",
    fontSize: 18,
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
    marginBottom: 30,
    marginTop: 20,
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
  },
});

//e7OII0Fu4HT4Lav5f2CXtDWN3OF3

export default RegisterWithUs;
