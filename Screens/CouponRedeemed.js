import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function CouponRedeemed({ route }) {
  // (route.params.finalBill,),
  // (route.params.couponId,),
  // (route.params.discount,),
  // (route.params.userBill),
  // route.params.client

  return (
    <View>
      <Text>Successfully Redeemed</Text>
      <Text>{route.params.client}</Text>
      <Text>{"Total Bill :" + route.params.userBill}</Text>
      <Text>{"Discount :" + route.params.discount}</Text>
      <Text>{"Final Bill :" + route.params.finalBill}</Text>
    </View>
  );
}
