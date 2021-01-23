import "react-native-gesture-handler";
import * as React from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  StatusBar,
  TextInput,
} from "react-native";
import { AuthContext } from "../routes/AuthProvider";
import { globalstyles } from "../styles/global";
import { db } from "../firebases";

export default function ProfileComplete({ navigation }) {
  const [location, setLocation] = React.useState("Bhilai");
  const [fullName, setFullName] = React.useState();
  const [age, setAge] = React.useState();
  const [gender, setGender] = React.useState("male");
  const { user } = React.useContext(AuthContext);
  const [locationOptions, setLocationOptions] = React.useState([
    { value: "Bhilai", label: "Bhilai", key: "Bhilai" },
    { value: "Raipur", label: "Raipur", key: "Raipur" },
  ]);
  const [genderOptions, setgenderOptions] = React.useState([
    { value: "male", label: "male", key: "male" },
    { value: "female", label: "female", key: "female" },
    { value: "other", label: "other", key: "other" },
  ]);
  function finish() {
    const data = {
      Coupons: {},
      Username: fullName,
      history: {},
      id: user.uid,
      location: location,
      age: age,
      gender: gender,
      phone: user.phoneNumber,
    };
    const userDoc = db.collection("Users").doc(user.uid);
    userDoc.set(data).catch((err) => {
      console.log(err);
    });
  }
  return (
    <View style={globalstyles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.banner}>
        <Image></Image>
      </View>
      <View style={styles.welcomeBackWrapper}>
        <Text style={styles.welcomeBack}>Complete profile</Text>
      </View>
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
          style={[styles.textinput, styles.textPassword]}
          placeholder="Age"
          placeholderTextColor="#EDEDED"
          color="#fff"
          onChangeText={(age) => setAge(age)}
        ></TextInput>
      </View>
      <View style={styles.picker}>
        <Picker
          style={{ width: "100%", height: 61, color: "#fff" }}
          selectedValue={location}
          onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
        >
          {locationOptions.map((item) => {
            return (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.key}
              />
            );
          })}
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker
          style={{ width: "100%", height: 61, color: "#fff" }}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          {genderOptions.map((item) => {
            return (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.key}
              />
            );
          })}
        </Picker>
      </View>
      <View style={styles.loginWrapper}>
        <TouchableNativeFeedback useForeground={true} onPress={finish}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonTitle}>Finish</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
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
