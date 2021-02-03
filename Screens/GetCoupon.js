import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { endAsyncEvent } from "react-native/Libraries/Performance/Systrace";
import { db } from "../firebases";

export default function GetCoupon({ navigation, route }) {
  const id = route.params.paramKey;
  const [coupon, setCoupon] = useState(null);
  useEffect(() => {
    db.collection("ClientData")
      .doc(id)
      .collection("Coupons")
      .where("isAlloted", "==", false)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setCoupon(doc.id);
          console.log(doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);
  function hh() {
    db.collection("ClientData")
      .doc(id)
      .collection("Coupons")
      .where("isAlloted", "==", false)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setCoupon(doc.id);
          console.log(doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
  return (
    <View>
      <Text>{coupon ? coupon : "null"}</Text>
      <Button title="HEllo" onPress={hh}></Button>
    </View>
  );
}
