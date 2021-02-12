import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";

export default function RedeemScreen({ navigation, route }) {
  const [userBill, setUserBill] = useState(0);
  const [finalBill, setFinalBill] = useState("");
  const [disable, setDisable] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [discountGiven, setdiscountGiven] = useState(null);
  const [moneyToCollect, setmoneyToCollect] = useState(null);
  const [discoutUserBill, setDiscountUserBill] = useState(null);
  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );
  //for bill calc
  useEffect(() => {
    console.log(selectedCoupon);
    if (selectedCoupon === null) return;
    if (userBill <= 99 || userBill === "") {
      setDisable(true);
    } else if (userBill >= 100 && userBill < 200) {
      const dis = selectedCoupon.discount1 - selectedCoupon.userDiscount1;
      setmoneyToCollect(Math.round((userBill * dis) / 100));
      const discount = Math.round(userBill / selectedCoupon.userDiscount1);
      setdiscountGiven(discount);
      setFinalBill(Math.round(userBill - discount));
      setDisable(false);
    } else if (userBill >= 200 && userBill < 300) {
      const dis = selectedCoupon.discount2 - selectedCoupon.userDiscount2;
      setmoneyToCollect(Math.round((userBill * dis) / 100));
      const discount = Math.round(userBill / selectedCoupon.userDiscount2);
      setdiscountGiven(discount);
      setFinalBill(Math.round(userBill - discount));
      setDisable(false);
    } else if (userBill >= 300 && userBill < 400) {
      const dis = selectedCoupon.discount3 - selectedCoupon.userDiscount3;
      setmoneyToCollect(Math.round((userBill * dis) / 100));
      const discount = Math.round(userBill / selectedCoupon.userDiscount3);
      setdiscountGiven(discount);
      setFinalBill(Math.round(userBill - discount));
      setDisable(false);
    } else if (userBill >= 400 && userBill < 500) {
      const dis = selectedCoupon.discount4 - selectedCoupon.userDiscount4;
      setmoneyToCollect(Math.round((userBill * dis) / 100));
      const discount = Math.round(userBill / selectedCoupon.userDiscount4);
      setdiscountGiven(discount);
      setFinalBill(Math.round(userBill - discount));
      setDisable(false);
    } else if (userBill >= 500) {
      const dis = selectedCoupon.discount5 - selectedCoupon.userDiscount5;
      setmoneyToCollect(Math.round((userBill * dis) / 100));
      const discount = Math.round(userBill / selectedCoupon.userDiscount5);
      setdiscountGiven(discount);
      setFinalBill(Math.round(userBill - discount));
      setDisable(false);
    }
  }, [userBill]);
  //for getting user coupons
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
      console.log(x);
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
        .where("client", "==", route.params.paramKey)
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
    console.log(discountGiven);
  }, [discountGiven]);
  async function handleSubmit() {
    if (selectedCoupon === null) return;
    db.collection("ClientData")
      .doc(route.params.paramKey)
      .collection("Coupons")
      .doc(selectedCoupon.id)
      .set(
        {
          isRedeemed: true,
          action: "Redeemed",
          moneyToCollect: moneyToCollect,
          discountGiven: discountGiven,
          userBill: userBill,
        },
        { merge: true }
      )
      .then(() => {
        var current = new Date();
        db.collection("Users")
          .doc(user.uid)
          .collection("Transactions")
          .add({
            action: "Redeemed",
            clientName: route.params.paramKey,
            couponId: selectedCoupon.id,
            dateRedeemed: current,
            discount: discountGiven,
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then(() =>
        navigation.navigate("CouponRedeemed", {
          finalBill: finalBill,
          couponId: selectedCoupon,
          discount: discountGiven,
          userBill: userBill,
          client: route.params.paramKey,
        })
      )
      .catch((err) => console.log(err));
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Text>{route.params.paramKey}</Text>
        <Text>Enter the Bill</Text>
        <TextInput
          keyboardType="phone-pad"
          placeholder="Enter The Bill"
          onChangeText={(e) => setUserBill(e)}
        />
        {coupons.length > 0 ? (
          <Picker
            style={{ width: "100%", height: 61, color: "#fff" }}
            selectedValue={selectedCoupon}
            onValueChange={(itemValue, itemIndex) => {
              console.log(itemValue);
              setSelectedCoupon(itemValue);
            }}
          >
            {coupons.map((item) => {
              return <Picker.Item label={item.id} value={item} key={item.id} />;
            })}
          </Picker>
        ) : (
          <View>
            <Text>You do not have any coupon for this store</Text>
          </View>
        )}
        <Button title="submit" disabled={disable} onPress={handleSubmit} />
        <Text>Coupons</Text>
      </View>
    </TouchableWithoutFeedback>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
