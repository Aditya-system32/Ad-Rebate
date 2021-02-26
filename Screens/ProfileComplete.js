import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  BackHandler,
  TextInput,
} from "react-native";
import {
  ScrollView,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import { AuthContext } from "../routes/AuthProvider";
import { globalstyles } from "../styles/global";
import { db } from "../firebases";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import BannerImages from "./BannerImages";

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
  const { user } = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [referralId, setReferralId] = useState("");
  const [clientName, setClientName] = useState(null);
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
    const backAction = () => {
      () => null;
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
    const tempClientName = [];
    db.collection("ClientData")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          tempClientName.push(doc.data().id);
        });
        setClientName(tempClientName);
      });
  }, []);

  //TAKING THE DETAILS FROM THE USER
  useEffect(() => {
    if (token !== undefined) {
      const data = {
        Coupons: {},
        username: fullName,
        history: {},
        couponsReceived: {},
        id: user.uid,
        expoToken: token,
        location: location,
        age: age,
        gender: gender,
        phone: user.phoneNumber,
      };
      checkingReferralId();
      setUserData();
      const tempCouponArray = [];
      async function giveCoupons() {
        const randomNumber = Math.floor(Math.random() * clientName.length);
        db.collection("ClientData")
          .doc(clientName[randomNumber])
          .collection("Coupons")
          .where("isAlloted", "==", false)
          .limit(2)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              tempCouponArray.push(doc.data());
            });
          })
          .then(() => {
            //console.log(tempCouponArray);
            tempCouponArray.map((coupon, index) => {
              //console.log(coupon.id);

              var current = new Date();
              current.setHours(current.getHours());
              const x = current.getHours() + "-" + current.getMinutes();
              const d =
                current.getDate() +
                "-" +
                (current.getMonth() + 1) +
                "-" +
                current.getFullYear();
              const datas = {
                activeFromTime: x,
                activeFromDate: d,
                isAlloted: true,
                allotedTo: user.uid,
              };

              if (index === 1) {
                datas.allotedTo = referralId;
              }
              //console.log(datas);
              db.collection("ClientData")
                .doc(coupon.client)
                .collection("Coupons")
                .doc(coupon.id)
                .set(datas, { merge: true })
                .then(() => console.log("done"))
                .catch((err) => {
                  console.log(err);
                });
            });
          });
      }
      async function checkingReferralId() {
        db.collection("Users")
          .doc(referralId == "" ? "No Referral Id" : referralId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              giveCoupons();
            } else {
              if (referralId == "") {
                console.log("User Not Enter Referral Id");
              } else {
                alert("Not Valid Id");
              }
            }
          });
      }
      async function setUserData() {
        const userDoc = db.collection("Users").doc(user.uid);
        userDoc
          .set(data)
          .then(() => navigation.navigate("AppIntroSliders"))
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
    }
  }, [token]);

  //CHECKING THE USER MOBILE ( USING EMULATOR OR NOT ) IF NOT TAKING THE TOKEN FROM THE USER
  const checkingTheUserMobile = async () => {
    registerForPushNotificationsAsync().then((tokenss) =>
      setExpoPushToken(tokenss)
    );
    async function registerForPushNotificationsAsync() {
      let tokenss;
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
        tokenss = (await Notifications.getDevicePushTokenAsync()).data;
        setToken(tokenss);
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

      return tokenss;
    }
  };

  return (
    <View style={globalstyles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.banner}>
        <BannerImages />
      </View>
      <View style={styles.welcomeBackWrapper}>
        <Text style={styles.welcomeBack}>Complete profile</Text>
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
        <View>
          <TextInput
            style={styles.textinput}
            placeholder="Referral Id(Optional)"
            placeholderTextColor="#EDEDED"
            color="#fff"
            onChangeText={(referralId) => setReferralId(referralId)}
          ></TextInput>
        </View>
        <TouchableNativeFeedback
          onPress={checkingTheUserMobile}
          style={styles.ProfileCompleteButton}
        >
          <Text style={styles.ProfileCompleteButtonTitle}>Finish</Text>
        </TouchableNativeFeedback>
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
    height: "16%",
    backgroundColor: "#000000",
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

//e7OII0Fu4HT4Lav5f2CXtDWN3OF3
