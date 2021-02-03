import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function GetCoupon({ navigation, route }) {
  useEffect(() => {
    //api calls to server
  }, []);
  return (
    <View>
      <Text>{route.params.paramKey}</Text>
    </View>
  );
}
