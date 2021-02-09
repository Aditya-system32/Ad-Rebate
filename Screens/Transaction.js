import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, StatusBar } from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";

export default function TransactionScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [redeemCouponArray, setRedeemCouponArray] = useState(null);

  useEffect(() => {
    const tempCouponArray = [];
    if (user) {
      db.collection("Users")
        .doc(user.uid)
        .collection("Transaction")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            //console.log(doc.data());
            tempCouponArray.push(doc.data());
          });
          setRedeemCouponArray(tempCouponArray);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
  console.log(redeemCouponArray);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text>Transaction Histroy</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
