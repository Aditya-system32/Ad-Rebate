import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

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
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";

export default function RedeemScreen({ navigation, route }) {
  const [userBill, setUserBill] = useState();
  const [disable, setDisable] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [discoutUserBill, setDiscountUserBill] = useState(null);
  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );
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

  useEffect(() => {
    let tempArray = [];
    console.log(user);
    if (user) {
      db.collectionGroup("Coupons")
        .where("allotedTo", "==", user.uid)
        .where("client", "==", route.params.paramKey)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            tempArray.push(doc.data());
          });
        })
        .catch((err) => {
          console.log(err);
        });
      setCoupons(tempArray);
    }
  }, [user]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Text>{route.params.paramKey}</Text>
        <Text>Enter the Bill</Text>
        <TextInput
          keyboardType="phone-pad"
          placeholder="Enter The Bill"
          onChangeText={checkUserBill}
        />
        {coupons.length > 0 ? (
          <Picker
            style={{ width: "100%", height: 61, color: "#fff" }}
            selectedValue={selectedCoupon}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCoupon(itemValue)
            }
          >
            {coupons.map((item) => {
              return (
                <Picker.Item label={item.id} value={item.id} key={item.id} />
              );
            })}
          </Picker>
        ) : (
          <View>
            <Text>You do not have any coupon for this store</Text>
          </View>
        )}
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
  picker: {
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    color: "#ffffff",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "80%",
    height: 61,
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    marginBottom: 24,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
