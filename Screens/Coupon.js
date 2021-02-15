import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";
import { FlatList } from "react-native-gesture-handler";
import test from "../assets/images/test.jpg";
export default function CouponScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [couponArray, setCouponArray] = useState([]);
  const [currentOption, setcurrentOption] = useState("active");
  const [loading, setLoading] = useState(false);
  BackHandler.addEventListener("hardwareBackPress", function () {
    navigation.pop();
    return true;
  });
  useEffect(() => {
    if (user) {
      setLoading(true);
      var current = new Date();
      db.collectionGroup("Coupons")
        .where("allotedTo", "==", user.uid)
        .where("isRedeemed", "==", false)
        .where("expiryDateMs", ">=", Date.parse(current))
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            var aa = new Date();
            if (doc.data().activeFrom <= Date.parse(aa))
              setCouponArray((prev) => [...prev, doc.data()]);
          });
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [user]);
  // for getting active users
  async function getActiveCoupons() {
    if (currentOption === "active") return;
    setCouponArray([]);
    var current = new Date();
    db.collectionGroup("Coupons")
      .where("allotedTo", "==", user.uid)
      .where("isRedeemed", "==", false)
      .where("expiryDateMs", ">=", Date.parse(current))
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          if (doc.data().activeFrom <= Date.parse(current))
            setCouponArray((prev) => [...prev, doc.data()]);
        });
      });
  }
  async function getExpiredCoupons() {
    if (currentOption === "expired") return;
    var current = new Date();
    setCouponArray([]);
    db.collectionGroup("Coupons")
      .where("allotedTo", "==", user.uid)
      .where("isRedeemed", "==", false)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          let x = [];
          x.push(doc.data());
          if (doc.data().expiryDate <= Date.parse(current))
            setCouponArray((prev) => [...prev, doc.data()]);
        });
      });
  }
  async function getAllCoupons() {
    if (currentOption === "all") return;
    setCouponArray([]);
    db.collectionGroup("Coupons")
      .where("allotedTo", "==", user.uid)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          setCouponArray((prev) => [...prev, doc.data()]);
        });
      });
  }
  async function getRedeemedCoupons() {
    if (currentOption === "redeemed") return;
    setCouponArray([]);
    db.collectionGroup("Coupons")
      .where("allotedTo", "==", user.uid)
      .where("isRedeemed", "==", true)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          setCouponArray((prev) => [...prev, doc.data()]);
        });
      });
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.optionHolder}>
        <Text
          style={[
            styles.option,
            currentOption === "active" ? styles.optionEnabled : "",
          ]}
          onPress={() => {
            setcurrentOption("active");
            getActiveCoupons();
          }}
        >
          Active
        </Text>
        <Text
          style={[
            styles.option,
            currentOption === "expired" ? styles.optionEnabled : "",
          ]}
          onPress={() => {
            setcurrentOption("expired");
            getExpiredCoupons();
          }}
        >
          Expired
        </Text>
        <Text
          style={[
            styles.option,
            currentOption === "redeemed" ? styles.optionEnabled : "",
          ]}
          onPress={() => {
            setcurrentOption("redeemed");
            getRedeemedCoupons();
          }}
        >
          Redeemed
        </Text>
        <Text
          style={[
            styles.option,
            currentOption === "all" ? styles.optionEnabled : "",
          ]}
          onPress={() => {
            setcurrentOption("all");
            getAllCoupons();
          }}
        >
          All
        </Text>
      </View>

      <SafeAreaView style={styles.couponHolder}>
        {loading ? (
          <View>
            <ActivityIndicator color="white"></ActivityIndicator>
          </View>
        ) : (
          <FlatList
            data={couponArray}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ alignItems: "center" }}
            renderItem={({ item }) => {
              const amPm = item.activeFromTime <= "12-00" ? "AM" : "PM";
              const hour = item.activeFromTime.split("-")[0] % 12;
              const timetoShow = hour + ":" + item.activeFromTime.split("-")[1];
              if (item.activeFromTime)
                return (
                  <View style={styles.coupon}>
                    <Image style={styles.couponImage} source={test}></Image>
                    <Text style={styles.couponTitle}>{item.clientName}</Text>
                    <Text style={styles.couponId}>{"#" + item.id}</Text>
                    <Text style={styles.couponActiveFrom}>
                      {"Active from : " +
                        item.activeFromDate.replace(/-/g, "/") +
                        " " +
                        timetoShow +
                        " " +
                        amPm}
                    </Text>
                    <Text style={styles.couponActiveFrom}>
                      {"Expiry date : " + item.expiryDate.replace(/-/g, "/")}
                    </Text>
                    <Text style={styles.couponDiscount}>
                      {"Discount upto : " + item.userDiscount5 + "%"}
                    </Text>
                  </View>
                );
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    borderRadius: 10,
    backgroundColor: "#1b1b1b",
    flex: 1,
    fontFamily: "Poppins-Light",
    margin: 10,
    fontSize: 12,
    textAlign: "center",
    color: "#6e6e6e",
    paddingTop: "3%",
  },
  optionEnabled: {
    flex: 1.2,
    backgroundColor: "#303030",
    color: "#f1f1f1",
  },
  optionHolder: {
    height: 60,
    width: "100%",
    flexDirection: "row",
  },

  couponImage: {
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
    width: "100%",
  },
  couponDiscount: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
    fontSize: 12,
  },
  couponActiveFrom: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-Regular",
    color: "#000000",
    fontSize: 10,
  },
  couponTitle: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
    fontSize: 16,
  },
  couponId: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-Regular",
    color: "#1b1b1b",
    fontSize: 8,
  },
  flatList: {
    alignItems: "center",
  },
  couponHolder: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "black",
    paddingTop: 10,
  },
  coupon: {
    width: Dimensions.get("window").width * 0.45,
    marginRight: 0,
    marginLeft: 10,
    padding: 10,
    height: 210,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    color: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
