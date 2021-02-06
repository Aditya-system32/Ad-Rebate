import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
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
import { addPushTokenListener } from "expo-notifications";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ProfileComplete({ navigation }) {
  const [location, setLocation] = useState("bhilai");
  const [fullName, setFullName] = useState();
  const [age, setAge] = useState();
  const [token, setToken] = useState();
  const [gender, setGender] = useState("male");
  const { user } = React.useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [locationOptions, setLocationOptions] = useState([
    { value: "bhilai", label: "Bhilai", key: "Bhilai" },
    { value: "raipur", label: "Raipur", key: "Raipur" },
  ]);
  const [genderOptions, setgenderOptions] = useState([
    { value: "male", label: "male", key: "male" },
    { value: "female", label: "female", key: "female" },
    { value: "other", label: "other", key: "other" },
  ]);
  useEffect(() => {
    if (token != undefined) {
      const data = {
        Coupons: {},
        Username: fullName,
        history: {},
        id: user.uid,
        expotoken: token,
        location: location,
        age: age,
        gender: gender,
        phone: user.phoneNumber,
      };
      const userDoc = db.collection("Users").doc(user.uid);
      userDoc.set(data).catch((err) => {
        console.log(err);
      });
      navigation.navigate("Home");
    } else {
    }
  }, [token]);
  checkingTheUserMobile = async () => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    async function registerForPushNotificationsAsync() {
      let token;
      if (Constants.isDevice) {
        const {
          status: existingStatus,
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        tokens = (await Notifications.getExpoPushTokenAsync()).data;
        //console.log(tokens);
        setToken(tokens);
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      return token;
    }
  };

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
      <View style={styles.ProfileCompleteWrapper}>
        <TouchableNativeFeedback
          useForeground={true}
          onPress={checkingTheUserMobile}
        >
          <View style={styles.ProfileCompleteButton}>
            <Text style={styles.ProfileCompleteButtonTitle}>Finish</Text>
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
  ProfileCompleteWrapper: {
    marginTop: 30,
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
    height: "16%",
    backgroundColor: "#70007a",
    width: "100%",
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
