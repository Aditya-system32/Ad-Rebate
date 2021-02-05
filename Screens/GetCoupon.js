import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";

export default function GetCoupon({ navigation, route }) {
  const id = route.params.paramKey;
  const [coupon, setCoupon] = useState(null);
  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );
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
    var current = new Date();
    const x = current.getHours()+1+"-"+current.getMinutes()+"-"+current.getHours()+1;
    const data = {
      activeFrom: x,
    };
  }, []);
  return (
    <View>
      <Text>{coupon ? coupon : "null"}</Text>
      <View style={styles.container}>
        <View style={styles.coupon}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coupon: {},
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
