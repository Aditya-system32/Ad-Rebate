import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function RedeemScreen({ navigation, route }) {
  const [userBill, setUserBill] = useState();
  const [disable, setDisable] = useState(true);
  const [discoutUserBill, setDiscountUserBill] = useState(null);

  const checkUserBill = (userBill) => {
    if (userBill <= 99 || userBill == null) {
      setDisable(true);
    } else {
      setDiscountUserBill(userBill / 10);
      setUserBill(userBill - discoutUserBill);
      console.log(userBill - discoutUserBill);
      setDisable(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Text>{route.params.paramKey}</Text>
        <Text>Enter the Bill</Text>
        <TextInput
          keyboardType="phone-pad"
          placeholder="Enter The Bill"
          onChangeText={checkUserBill}
        />
        <Button
          title="submit"
          disabled={disable}
          onPress={() =>
            navigation.navigate("CouponVerification", {
              paramKey: userBill,
            })
          }
        />
        <Text>Coupons</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
