import React, { useState, useEffect } from "react";
import { View, Text, BackHandler, Button } from "react-native";

export default function CouponRedeemed({ navigation, route }) {
  // (route.params.finalBill,),
  // (route.params.couponId,),
  // (route.params.discount,),
  // (route.params.userBill),
  // route.params.client
  BackHandler.addEventListener("hardwareBackPress", function () {
    navigation.popToTop();
    return true;
  });

  return (
    <View>
      <Text>Successfully Redeemed</Text>
      <Text>{route.params.client}</Text>
      <Text>{"Total Bill :" + route.params.userBill}</Text>
      <Text>{"Discount :" + route.params.discount}</Text>
      <Text>{"Final Bill :" + route.params.finalBill}</Text>
      <Button title="Go Home" onPress={() => navigation.popToTop()} />
    </View>
  );
}
