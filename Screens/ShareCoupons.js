import "react-native-gesture-handler";
import React, { useState, useContext, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
  Share,
} from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";

export default function ProfileScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [disabled, setDisabled] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [shareUser, setShareUser] = useState();
  const [shareMessage, setShareMessage] = useState("Play Store Link");
  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );

  const checkingPhoneNumber = async (phoneNumber) => {
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

  useEffect(() => {
    if (user) {
      setShareMessage(
        "Ad-Rebate\n\nReferral Id - \n" +
          user.uid +
          "\n\nuse this Id to get Coupon\n\n" +
          "https://play.google.com/store/apps/details?id=" +
          "appPackageName"
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
          //console.log(tempUser);
          //console.log(selectedCoupon);
        })
        .then(() => {
          db.collection("ClientData")
            .doc(selectedCoupon.client)
            .collection("Coupons")
            .doc(selectedCoupon.id)
            .set({ allotedTo: tempUser[0].id }, { merge: true })
            .then(
              () => navigation.popToTop(),
              console.log("done"),
              Alert.alert("Coupon Shared")
            )
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(function (error) {
          Alert.alert("Not a Valdi user in Ad-Rebate");
          console.log("Not a valid User ", error);
        });
    }
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
      {coupons.length > 0 ? (
        <View style={styles.picker}>
          <Picker
            style={{
              color: "white",
              fontSize: 12,
            }}
            dropdownIconColor="gray"
            onValueChange={(itemValue, itemIndex) => {
              console.log("ote," + itemValue);
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
          <Text style={{ color: "#920000", fontFamily: "Poppins-Regular" }}>
            You do not have any coupon for this store
          </Text>
        </View>
      )}
      <Button title="Share" onPress={shareCouponChecking} disabled={disabled} />
      <Button title="Refer And Earn" onPress={onShare} />
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
  picker: {
    backgroundColor: "#252525",
    borderColor: "#424242",
    color: "#ffffff",
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 20,
    width: "80%",
    height: 50,
    alignSelf: "center",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginBottom: 24,
  },
  pickerItem: {
    color: "white",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#252525",
    borderRadius: 10,
    width: "80%",
    height: 50,
    textAlign: "center",
    marginBottom: 10,
  },
});
