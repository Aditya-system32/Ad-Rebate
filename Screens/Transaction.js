import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";
import {
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { scaledSize } from "./Home";
import { View as MotiView } from "moti";
export default function TransactionScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [redeemCouponArray, setRedeemCouponArray] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    const tempCouponArray = [];
    getdata();
    async function getdata() {
      if (user) {
        setloading(true);
        db.collection("Users")
          .doc(user.uid)
          .collection("Transactions")
          .orderBy("dateRedeemed", "desc")
          .orderBy("timeRedeemed", "desc")
          .get()
          .then((res) => {
            res.forEach((doc) => {
              //console.log(doc.data());
              tempCouponArray.push(doc.data());
            });
            setRedeemCouponArray(tempCouponArray);
            setloading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [user]);

  function refresh() {
    const tempCouponArray = [];
    if (user) {
      setloading(true);
      db.collection("Users")
        .doc(user.uid)
        .collection("Transactions")
        .orderBy("dateRedeemed", "desc")
        .orderBy("timeRedeemed", "desc")
        .get()
        .then((res) => {
          res.forEach((doc) => {
            tempCouponArray.push(doc.data());
          });
          setRedeemCouponArray(tempCouponArray);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text style={styles.title}>Your History,</Text>
      <SafeAreaView style={styles.transactionContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#2c2c2c"
            style={{ marginTop: "50%" }}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={true}
            alwaysBounceVertical={true}
            bounces={true}
            onRefresh={() => refresh()}
            bouncesZoom={true}
            ListEmptyComponent={() => (
              <Text
                style={{
                  color: "#ffc8c8",
                  fontFamily: "Poppins-Regular",
                  fontSize: scaledSize(12),
                  alignSelf: "center",
                  textAlignVertical: "center",
                  marginTop: scaledSize(280),
                }}
              >
                You have done no transactions yet.
              </Text>
            )}
            data={redeemCouponArray}
            keyExtractor={(item) => item.couponId}
            renderItem={({ item }) => {
              const amPm = item.timeRedeemed <= "12-00" ? "AM" : "PM";
              const hour = item.timeRedeemed.split("-")[0] % 12;
              const timetoShow = hour + ":" + item.timeRedeemed.split("-")[1];
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  background={TouchableNativeFeedback.Ripple("red", false)}
                >
                  <MotiView
                    from={{
                      opacity: 0,
                      translateX: -50,
                    }}
                    animate={{
                      opacity: 1,
                      translateX: 0,
                    }}
                    transition={{
                      type: "spring",
                    }}
                    style={styles.transactionItem}
                  >
                    <Text style={styles.itemTitle}>{item.clientName}</Text>
                    <Text style={styles.itemId}>{"#" + item.couponId}</Text>

                    <View style={styles.actionAndDiscount}>
                      <Text style={styles.itemDiscount}>
                        {"₹ " + item.discount}
                      </Text>
                      <Text style={styles.itemAction}>{item.action}</Text>
                    </View>
                    <Text style={styles.itemDate}>
                      {item.dateRedeemed + " " + timetoShow + " " + amPm}
                    </Text>
                  </MotiView>
                </TouchableOpacity>
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
    color: "#cccccc",
    fontSize: scaledSize(25),
    padding: scaledSize(20),
    paddingBottom: 0,
  },
  titleAndId: {},
  actionAndDiscount: {
    flexDirection: "row",
  },
  itemTitle: {
    color: "white",
    fontSize: scaledSize(14),
    fontFamily: "Poppins-Medium",
    marginLeft: scaledSize(5),
  },
  itemId: {
    color: "#747474",
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(9),
    marginLeft: scaledSize(5),
  },
  itemDiscount: {
    color: "#34c263",
    fontFamily: "Poppins-SemiBold",
    fontSize: scaledSize(15),
    paddingTop: scaledSize(5),
    marginLeft: scaledSize(5),
  },
  itemDate: {
    position: "absolute",
    right: scaledSize(20),
    bottom: scaledSize(10),
    color: "#747474",
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(9),
  },
  itemAction: {
    color: "#34c263",
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(15),
    paddingTop: scaledSize(5),
    marginLeft: scaledSize(5),
  },
  transactionItem: {
    color: "white",
    backgroundColor: "#161616",
    width: "92%",
    alignSelf: "center",
    zIndex: 5,
    padding: scaledSize(10),
    borderRadius: scaledSize(10),
    position: "relative",
    marginBottom: scaledSize(15),
    justifyContent: "center",
  },
  transactionContainer: {
    backgroundColor: "black",
    color: "white",
    flex: 1,
    width: "100%",
    paddingTop: scaledSize(20),
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
