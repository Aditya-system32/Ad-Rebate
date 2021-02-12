import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";
import {
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";

export default function TransactionScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [redeemCouponArray, setRedeemCouponArray] = useState([]);

  useEffect(() => {
    const tempCouponArray = [];
    if (user) {
      db.collection("Users")
        .doc(user.uid)
        .collection("Transactions")
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
  //console.log(redeemCouponArray);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text style={styles.title}>Your History,</Text>
      <SafeAreaView style={styles.transactionContainer}>
        {redeemCouponArray.length < 1 ? (
          <ActivityIndicator
            size="large"
            color="#2c2c2c"
            style={{ marginTop: "50%" }}
          />
        ) : (
          <FlatList
            data={redeemCouponArray}
            keyExtractor={(item) => item.couponId}
            renderItem={({ item }) => {
              const amPm = item.timeRedeemed <= "12-00" ? "AM" : "PM";
              const hour = item.timeRedeemed.split("-")[0] % 12;
              const timetoShow = hour + ":" + item.timeRedeemed.split("-")[1];
              return (
                <TouchableNativeFeedback style={styles.transactionItem}>
                  <View>
                    <View style={styles.titleAndId}>
                      <Text style={styles.itemTitle}>{item.clientName}</Text>
                      <Text style={styles.itemId}>{"#" + item.couponId}</Text>
                    </View>

                    <View style={styles.actionAndDiscount}>
                      <Text style={styles.itemDiscount}>
                        {"₹ " + item.discount}
                      </Text>
                      <Text style={styles.itemAction}>{item.action}</Text>
                    </View>
                    <Text style={styles.itemDate}>
                      {item.dateRedeemed + " " + timetoShow + " " + amPm}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              );
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    backgroundColor: "black",
    width: "100%",
    fontFamily: "Poppins-SemiBold",
    color: "#747474",
    fontSize: 25,
    padding: 20,
    paddingBottom: 0,
  },
  titleAndId: {
    flexDirection: "row",
  },
  actionAndDiscount: {
    flexDirection: "row",
  },
  itemTitle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  itemId: {
    color: "#747474",
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    paddingTop: 5,
    marginLeft: 5,
  },
  itemDiscount: {
    color: "#34c263",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    paddingTop: 5,
    marginLeft: 5,
  },
  itemDate: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 5,
    color: "#747474",
    fontFamily: "Poppins-Medium",
    fontSize: 11,
    paddingTop: 5,
    marginLeft: 5,
  },
  itemAction: {
    color: "#34c263",
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    paddingTop: 5,
    marginLeft: 5,
  },
  transactionItem: {
    color: "white",
    backgroundColor: "#161616",
    width: "90%",
    alignSelf: "center",
    height: 70,
    zIndex: 5,
    padding: 10,
    borderRadius: 10,
    position: "relative",
    marginBottom: 15,
  },
  transactionContainer: {
    backgroundColor: "black",
    color: "white",
    flex: 1,
    width: "100%",
    paddingTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
