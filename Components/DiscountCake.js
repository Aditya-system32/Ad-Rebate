import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { View as MotiView } from "moti";
import { Rating } from "react-native-ratings";
import { scaledSize } from "../Screens/Home";
import { AuthContext } from "../routes/AuthProvider";
import { db } from "../firebases";
import firebase from "firebase";

const DiscountCake = ({
  setopenDiscount,
  openDiscount,
  id,
  navigation,
  name,
  minAmount,
}) => {
  const { user, setUserData, userData } = useContext(AuthContext);
  const [bill, setbill] = useState(0);
  const [coupon, setcoupon] = useState(null);
  const [haveCoupon, sethaveCoupon] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!id) return;
    var current = new Date();
    db.collectionGroup("Coupons")
      .where("client", "==", id)
      .where("allotedTo", "==", user.uid)
      .where("isRedeemed", "==", false)
      .where("expiryDateMs", ">=", Date.parse(current))
      .limit(1)
      .get()
      .then((docs) => {
        let x = [];
        docs.forEach((doc) => {
          let data = doc.data();
          if (data) {
            sethaveCoupon(true);
            setcoupon(data);
          }
        });
      });
  }, [id]);

  async function submit() {
    if (bill <= minAmount) {
      ToastAndroid.showWithGravity(
        `Minimum bill amount is ${minAmount}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    } else {
      setloading(true);
      if (coupon === null) {
        ToastAndroid.showWithGravity(
          "check details again",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        return;
      }
      var current = new Date();
      const x =
        (current.getHours() < 10 ? "0" : "") +
        current.getHours() +
        "-" +
        (current.getMinutes() < 10 ? "0" : "") +
        current.getMinutes();
      const d =
        (current.getDate() < 10 ? "0" : "") +
        current.getDate() +
        "-" +
        (current.getMonth() + 1 < 10 ? "0" : "") +
        (current.getMonth() + 1) +
        "-" +
        current.getFullYear();
      let months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUNE",
        "JULY",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      const dis = coupon.discount1 - coupon.userDiscount1;
      let moneyToCollect = Math.round((bill * dis) / 100);
      const discount = Math.round(bill / coupon.userDiscount1);
      let finalBill = Math.round(bill - discount);

      db.collection("ClientData")
        .doc(id)
        .collection("Coupons")
        .doc(coupon.id)
        .set(
          {
            isRedeemed: true,
            action: "Redeemed",
            moneyToCollect: moneyToCollect,
            discountGiven: discount,
            userBill: bill,
            dateRedeemed: d,
            timeRedeemed: x,
            month: months[current.getMonth()],
            year: current.getFullYear(),
          },
          { merge: true }
        )
        .then(() => {
          db.collection("Users")
            .doc(user.uid)
            .collection("Transactions")
            .add({
              action: "Redeemed",
              clientName: name,
              couponId: coupon.id,
              dateRedeemed: d,
              discount: discount,
              timeRedeemed: x,
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .then(() =>
          navigation.replace("CouponRedeemed", {
            finalBill: finalBill,
            couponId: coupon.id,
            discount: discount,
            userBill: bill,
            client: id,
          })
        )
        .catch((err) => console.log(err));
      setloading(false);
      setopenDiscount(false);
    }
  }
  return (
    <MotiView
      from={{ translateY: 350 }}
      animate={{ translateY: 0 }}
      exit={{ translateY: 350 }}
      transition={{ type: "timing" }}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => setopenDiscount(false)}
        style={styles.down}
      >
        <AntDesign name="down" size={scaledSize(20)} color="#aaaaaa" />
      </TouchableOpacity>
      {haveCoupon ? (
        <View>
          <Text style={styles.heading}>
            {
              "Remember : \n\n1. Only apply coupon after getting bill amount of your cake. \n 2. After applying coupon, share screenshot to shop owner through whatsapp.\n"
            }
          </Text>
          <Text style={styles.couponApplied}>Coupon applied</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setbill(text)}
            placeholder="Enter your Bill"
            textAlignVertical="top"
            selectionColor="#111111"
          ></TextInput>

          <View style={styles.buttonwrapper}>
            <TouchableNativeFeedback
              disable={loading}
              onPress={() => submit()}
              background={TouchableNativeFeedback.Ripple("#8f8f8f")}
            >
              <View style={styles.button}>
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.buttontext}>Submit</Text>
                )}
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.nocoupon}>
            You do not have any coupon, watch video to get one. :)
          </Text>
        </View>
      )}
    </MotiView>
  );
};

export default DiscountCake;

const styles = StyleSheet.create({
  heading: {
    color: "#ffffff",
    fontSize: scaledSize(14),
    fontFamily: "Poppins-Medium",
    textAlign: "left",
    marginTop: scaledSize(30),
    paddingHorizontal: scaledSize(20),
  },
  e404: {
    color: "#ffffff",
    fontSize: scaledSize(60),
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    marginTop: scaledSize(40),
  },
  nocoupon: {
    color: "#ffcdcd",
    fontSize: scaledSize(12),
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    marginTop: scaledSize(160),
  },
  down: {
    borderRadius: scaledSize(50),
    width: scaledSize(40),
    height: scaledSize(40),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: scaledSize(10),
    top: scaledSize(10),
  },
  textInput: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignSelf: "center",
    width: scaledSize(350),
    borderRadius: scaledSize(20),
    height: scaledSize(40),
    marginTop: scaledSize(20),
    alignItems: "flex-start",
    paddingHorizontal: scaledSize(15),
    fontFamily: "Poppins-Regular",
    paddingTop: scaledSize(8),
  },
  couponApplied: {
    flexDirection: "row",
    backgroundColor: "#97ff9f",
    alignSelf: "center",
    width: scaledSize(350),
    borderRadius: scaledSize(20),
    height: scaledSize(40),
    marginTop: scaledSize(10),
    alignItems: "flex-start",
    paddingHorizontal: scaledSize(15),
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    paddingTop: scaledSize(8),
    paddingLeft: scaledSize(10),
  },
  container: {
    position: "absolute",
    backgroundColor: "#1b1b1b",
    borderTopLeftRadius: scaledSize(20),
    borderTopRightRadius: scaledSize(20),
    height: scaledSize(400),
    width: "100%",
    bottom: 0,
    zIndex: 10,
    borderColor: "#444444",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  buttontext: {
    color: "#ffffff",
    fontSize: scaledSize(14),
    fontFamily: "Poppins-Medium",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: scaledSize(158),
    borderRadius: scaledSize(20),
    height: scaledSize(48),
    borderColor: "#808080",
    borderStyle: "solid",
    borderWidth: scaledSize(1),
  },
  buttonwrapper: {
    width: scaledSize(158),
    borderRadius: scaledSize(20),
    height: scaledSize(48),
    overflow: "hidden",
    alignSelf: "center",
    marginTop: scaledSize(20),
  },
});
