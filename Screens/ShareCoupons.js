import "react-native-gesture-handler";
import React, { useState, useContext, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
  BackHandler,
  Share,
  ActivityIndicator,
} from "react-native";
import { db } from "../firebases";
import * as firebase from "firebase";
import { AuthContext } from "../routes/AuthProvider";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import BannerImages from "./BannerImages";
import { scaledSize } from "./Home";

export default function ShareCouponScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [shareMessage, setShareMessage] = useState(
    "https://play.google.com/store/apps/details?id=com.adverttonlineservices.adrebate" +
      "\n\nAd-Rebate\nAdvertisement On Your Control"
  );
  const [pickerLable, setPickerLable] = useState("Choose Coupon");
  const { user, userData } = useContext(AuthContext);

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

  const checkingPhoneNumber = async (phoneNumber) => {
    phoneNumber = phoneNumber.replace(".", "");
    if (
      phoneNumber.length != 10 ||
      phoneNumber.length == 0 ||
      isNaN(phoneNumber)
    ) {
      setPhoneNumber(phoneNumber);
      setDisabled(true);
      setErrorText("Enter valid 10 digit number");
    } else {
      setPhoneNumber("+91" + phoneNumber);
      setDisabled(false);
      setErrorText(null);
    }
  };

  useEffect(() => {
    if (user) {
      setShareMessage(
        "https://play.google.com/store/apps/details?id=" +
          "com.adverttonlineservices.adrebate" +
          "\n\n" +
          "Ad-Rebate\n\n" +
          "Use My Referral Id to get Coupon\n\n" +
          "Referral Id - " +
          user.uid
      );
    }
  }, []);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: shareMessage,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (user === null) return;
    async function temp() {
      setLoading(true);
      var current = new Date();
      const x =
        current.getHours() < 10
          ? "0"
          : "" + current.getHours() + "-" + current.getMinutes() < 10
          ? "0"
          : "" + current.getMinutes();
      //console.log(x);
      const d =
        (current.getDate() < 10 ? "0" : "") +
        current.getDate() +
        "-" +
        (current.getMonth() + 1 < 10 ? "0" : "") +
        (current.getMonth() + 1) +
        "-" +
        current.getFullYear();
      db.collectionGroup("Coupons")
        .where("allotedTo", "==", user.uid)
        .where("isRedeemed", "==", false)
        .where("expiryDateMs", ">=", Date.parse(current))
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            var aa = new Date();
            if (doc.data().activeFrom <= Date.parse(aa))
              setCoupons((prev) => [...prev, doc.data()]);
          });
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    temp();
  }, [user]);

  useEffect(() => {
    if (coupons.length < 1) {
      return;
    }
    //console.log("ccc");
    //console.log(coupons);
    setSelectedCoupon(coupons[0]);
  }, [coupons]);

  //console.log(coupons);
  const shareCouponChecking = async () => {
    if (coupons != null) {
      const tempUser = [];
      db.collection("Users")
        .where("phone", "==", phoneNumber)
        .get()
        .then((res) => {
          res.forEach((user) => {
            tempUser.push(user.data());
          });
          //console.log(selectedCoupon);
        })
        .then(() => {
          //console.log(userData.username);
          db.collection("ClientData")
            .doc(selectedCoupon.client)
            .collection("Coupons")
            .doc(selectedCoupon.id)
            .set({ allotedTo: tempUser[0].id }, { merge: true })
            .then(
              db
                .collection("Users")
                .doc(tempUser[0].id)
                .set(
                  {
                    couponsReceived: firebase.firestore.FieldValue.arrayUnion(
                      userData.username
                    ),
                  },
                  { merge: true }
                )
                .then(
                  () => navigation.popToTop(),
                  console.log("done"),
                  Alert.alert("Coupon Shared")
                )
            )
            .catch((err) => {
              console.log(err);
            })

            .catch((err) => {
              console.log(err);
            });
        })

        .catch(function (error) {
          Alert.alert("Not a Valid user in Ad-Rebate");
        });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.banner}>
        <BannerImages />
      </View>
      <TextInput
        style={styles.textinput}
        placeholder="Enter phone no."
        placeholderTextColor="#EDEDED"
        keyboardAppearance="dark"
        keyboardType="phone-pad"
        color="#fff"
        onChangeText={checkingPhoneNumber}
      ></TextInput>
      {<Text style={styles.erText}>{errorText}</Text>}
      {loading ? (
        <View
          style={[
            styles.picker,
            {
              justifyContent: "center",
              paddingTop: 2,
              paddingRight: 30,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.gtt}>Getting your coupons..</Text>
          <ActivityIndicator color="white" size="small"></ActivityIndicator>
        </View>
      ) : coupons.length > 0 ? (
        <View style={styles.picker}>
          <Picker
            style={{
              color: "#ededed",
              height: scaledSize(30),
              marginTop: scaledSize(10),
              textAlign: "left",
              width: "100%",
            }}
            dropdownIconColor="gray"
            selectedValue={selectedCoupon}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCoupon(itemValue);
            }}
          >
            {coupons.map((item) => {
              return (
                <Picker.Item
                  style={styles.pickerItem}
                  label={
                    item.clientName +
                    " - discount upto : " +
                    item.userDiscount5 +
                    "%"
                  }
                  value={item}
                  key={item.id}
                />
              );
            })}
          </Picker>
        </View>
      ) : (
        <View style={styles.erText}>
          <Text style={{ color: "#ff6d6d", fontFamily: "Poppins-Regular" }}>
            You do not have any coupon.
          </Text>
        </View>
      )}
      <TouchableNativeFeedback
        onPress={shareCouponChecking}
        disabled={disabled}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Share</Text>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: "20%",
    marginTop: 5,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "2%",
  },
  buttonText: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    fontSize: scaledSize(16),
    fontFamily: "Poppins-Regular",
  },
  gtt: {
    color: "#fff",
    marginRight: scaledSize(10),
    fontSize: scaledSize(16),
    fontFamily: "Poppins-Regular",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: scaledSize(150),
    borderRadius: scaledSize(20),
    marginTop: scaledSize(50),
    height: scaledSize(58),
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
  },
  textinput: {
    marginTop: scaledSize(100),
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
  erText: {
    color: "#ff7474",
    width: "75%",
    fontFamily: "Poppins-Regular",
    height: scaledSize(40),
    textAlign: "center",
    alignSelf: "center",
    marginTop: -scaledSize(10),
  },
  picker: {
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    color: "#f3f3f3",
    borderWidth: 1,
    borderRadius: scaledSize(20),
    paddingLeft: scaledSize(20),
    paddingTop: scaledSize(5),
    width: "80%",
    height: scaledSize(61),
    alignSelf: "center",
    fontSize: scaledSize(12),
    fontFamily: "Poppins-Regular",
    marginBottom: scaledSize(24),
  },
  pickerItem: {
    color: "white",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#252525",
    borderRadius: scaledSize(10),
    width: "80%",
    height: scaledSize(50),
    textAlign: "center",
    marginBottom: scaledSize(10),
  },
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
