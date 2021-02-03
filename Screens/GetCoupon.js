import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { endAsyncEvent } from "react-native/Libraries/Performance/Systrace";
import { db } from "../firebases";

export default function GetCoupon({ navigation, route }) {
  const id = route.params.paramKey;
  const [coupon, setCoupon] = useState(null);
  useEffect(() => {
    const temp = [];
    async () =>
      db
        .collection("ClientData")
        .doc(id)
        .collectionGroup("Coupons")
        // .where("isAlloted", "==", false)
        // .limit(1)
        .doc("GJ3vmLnH2xiwM4Z18HNV")
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setCoupon(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    /*.catch(function (error) {
          console.log("Error getting document:", error);
        });*/
  }, []);
  return (
    <View>
      <Text>{coupon ? coupon : "null"}</Text>
    </View>
  );
}
