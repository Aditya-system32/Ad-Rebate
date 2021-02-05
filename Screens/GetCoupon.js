import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { db } from "../firebases";

export default function GetCoupon({ navigation, route }) {
  //const id = route.params.paramKey;
  const id = "chocolateStoryBhilai";
  const [coupon, setCoupon] = useState(null);
  useEffect(() => {
    db.collection("ClientData")
      .doc(id)
      .collection("Coupons")
      .where("isAlloted", "==", false)
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          setCoupon(doc.data().id);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);
  return (
    <View>
      <Text>{coupon ? coupon : "null"}</Text>
      <Button title="HEllo" onPress={() => navigation.popToTop()}></Button>
    </View>
  );
}
