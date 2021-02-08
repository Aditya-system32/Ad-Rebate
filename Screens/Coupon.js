import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, StatusBar } from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";

export default function CouponScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [couponArray, setCouponArray] = useState(null);

  useEffect(() => {
    if (user) {
      const tempCouponsArray = [];
      db.collectionGroup("Coupons")
        .where("allotedTo", "==", user.uid)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            tempCouponsArray.push(doc.data());
          });
          setCouponArray(tempCouponsArray);
        });
    }
  }, []);
  const checking = () => {
    couponArray.map((coupon) => {
      console.log(coupon.id);
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Button title="Go back" onPress={checking} />
      <Button title="test" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
