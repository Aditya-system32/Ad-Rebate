import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";
import * as firebase from "firebase";
export default function GetCoupon({ navigation, route }) {
  //const id = route.params.paramKey;
  const id = "chocolateStoryBhilai";
  const [coupon, setCoupon] = useState(null);

  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );
  useEffect(() => {
    getCoupon();
  }, []);
  async function getCoupon() {
    db.collection("ClientData")
      .doc(id)
      .collection("Coupons")
      .where("isAlloted", "==", false)
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          setCoupon(doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
  useEffect(() => {
    if (!coupon) return;
    var current = new Date();
    const dateActive = current.getMonth();
    current.setHours(current.getHours() + 1);
    const x = current.getHours() + "-" + current.getMinutes();
    const d =
      current.getDay() +
      "-" +
      (current.getMonth() + 1) +
      "-" +
      current.getFullYear();
    const data = {
      activeFromTime: x,
      activeFromDate: d,
      isAlloted: true,
      allotedTo: user.uid,
    };
    setCoupon((prev) => ({
      ...prev,
      activeFromTime: x,
      activeFromDate: d,
      isAlloted: true,
      allotedTo: user.uid,
    }));
    db.collection("ClientData")
      .doc(id)
      .collection("Coupons")
      .doc(coupon.id)
      .set(data, { merge: true })
      .catch((err) => {
        console.log(err);
      });
  }, [coupon]);

  return (
    <View style={styles.page}>
      <Text>{coupon ? coupon.id : "loading"}</Text>
      <View style={styles.container}>
        {coupon ? (
          <View style={styles.coupon}>
            <Text style={styles.couponText}>{coupon.id}</Text>
            <Text style={styles.couponText}>{coupon.discount1}</Text>
            <Text style={styles.couponText}>{coupon.expiryDate}</Text>
            <View style={styles.activeDate}>
              <Text style={styles.couponText}>{coupon.activeFromDate}</Text>
              <Text style={styles.couponText}>{coupon.activeFromTime}</Text>
            </View>
          </View>
        ) : (
          <View>
            <Text>loading</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeDate: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: 200,
  },
  page: {
    backgroundColor: "black",
    justifyContent: "center",
  },
  coupon: {
    borderRadius: 20,
    width: "60%",
    height: 200,
    marginTop: 100,
    color: "white",
    borderRadius: 20,
    backgroundColor: "#000",
    padding: 20,
  },
  couponText: {
    color: "#a0a0a0",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});
