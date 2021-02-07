import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function CouponVerification({ route }) {
  const [userBill, setUserBill] = useState(route.params.paramKey);

  return (
    <View>
      <Text>{userBill}</Text>
    </View>
  );
}
