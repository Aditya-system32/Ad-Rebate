import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, StatusBar } from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";

export default function CouponScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [couponArray, setCouponArray] = useState(null);

  useEffect(() => {
    const tempCouponsArray = [];
    db.collectionGroup("Coupons")
      .where("allotedTo", "==", user.uid)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          //console.log(doc.data());
          tempCouponsArray.push(doc.data());
        });
        setCouponArray(tempCouponsArray);
      });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View>
        <Text style={{ color: "black" }}>Hello</Text>
      </View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
