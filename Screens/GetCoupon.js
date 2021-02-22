import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  Image,
} from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import test from "../assets/images/test.jpg";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";
export default function GetCoupon({ navigation, route }) {
  //const id = route.params.paramKey;
  const id = "chocolateStoryBhilai";
  const [coupon, setCoupon] = useState(null);
  const [amPm, setamPm] = useState(null);
  const [timetoShow, settimetoShow] = useState(null);
  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );

  useEffect(() => {
    if (coupon === null) return;
    setamPm(coupon.activeFromTime <= "12-00" ? "AM" : "PM");
    const hour = coupon.activeFromTime.split("-")[0] % 12;
    settimetoShow(hour + ":" + coupon.activeFromTime.split("-")[1]);
  }, [coupon]);
  useEffect(() => {
    const backAction = () => {
      navigation.popToTop();
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
    let xx = {};
    async function xxx() {
      db.collection("ClientData")
        .doc(id)
        .collection("Coupons")
        .where("isAlloted", "==", false)
        .limit(1)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            xx = doc.data();
            console.log(xx);
          });
        })
        .then(() => {
          var current = new Date();
          current.setHours(current.getHours() + 1);
          const x =
            (current.getHours() < 10 ? "0" : "") +
            current.getHours() +
            "-" +
            (current.getMinutes() < 10 ? "0" : "") +
            current.getMinutes();
          const d =
            (current.getDate() < 10 ? "0" : "") +
            current.getDate() +
            "-" +
            (current.getMonth() + 1 < 10 ? "0" : "") +
            (current.getMonth() + 1) +
            "-" +
            current.getFullYear();
          var nn = new Date();
          nn.setDate(nn.getDate() + 3);
          const ed =
            (nn.getDate() < 10 ? "0" : "") +
            nn.getDate() +
            "-" +
            (nn.getMonth() + 1 < 10 ? "0" : "") +
            (nn.getMonth() + 1) +
            "-" +
            nn.getFullYear();
          xx.expiryDate = ed;
          xx.expiryDateMs = Date.parse(nn);
          xx.activeFrom = Date.parse(current);
          xx.activeFromTime = x;
          xx.activeFromDate = d;
          xx.isAlloted = true;
          xx.allotedTo = user.uid;
          setCoupon(xx);
          console.log("done");

          db.collection("ClientData")
            .doc(id)
            .collection("Coupons")
            .doc(xx.id)
            .set(xx)
            .then(() => console.log("done"))
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
    xxx();
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.congrats}>Congratulations! </Text>
      <Text style={styles.congrats2}>coupon recieved</Text>
      <View style={styles.container}>
        {coupon && coupon.id !== undefined ? (
          <View style={styles.coupon}>
            <Image style={styles.couponImage} source={test}></Image>
            <Text style={styles.couponTitle}>{coupon.clientName}</Text>
            <Text style={styles.couponId}>{"#" + coupon.id}</Text>
            <Text style={styles.couponActiveFrom}>
              {"Active from : " +
                coupon.activeFromDate.replace(/-/g, "/") +
                " " +
                timetoShow +
                " " +
                amPm}
            </Text>
            <Text style={styles.couponActiveFrom}>
              {"Expiry date : " + coupon.expiryDate?.replace(/-/g, "/")}
            </Text>
            <Text style={styles.couponDiscount}>
              {"Discount upto : " + coupon.userDiscount5 + "%"}
            </Text>
          </View>
        ) : (
          <View>
            <ActivityIndicator color="white"></ActivityIndicator>
          </View>
        )}
      </View>
      <Text style={styles.noti}>You can only redeem this after an hour</Text>

      <TouchableNativeFeedback
        style={styles.gohome}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.tt}>Go home</Text>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  noti: {
    color: "#dddddd",
    fontFamily: "Poppins-Regular",
    marginBottom: 20,
    width: "100%",
    backgroundColor: "rgba(37, 37, 38, 0.5)",
    textAlign: "center",
    paddingTop: 5,
  },
  tt: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  gohome: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 150,
    borderRadius: 20,
    marginBottom: 50,
    height: 58,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
  },
  congrats2: {
    color: "#fff",
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  congrats: {
    color: "#46ff83",
    width: "100%",
    textAlign: "center",
    marginTop: 70,
    fontSize: 25,
    fontFamily: "Poppins-SemiBold",
  },
  page: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  couponImage: {
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
    width: "100%",
  },
  couponDiscount: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
    fontSize: 14,
  },
  couponActiveFrom: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-Regular",
    color: "#000000",
    fontSize: 14,
  },
  couponTitle: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
    fontSize: 20,
  },
  couponId: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-Regular",
    color: "#1b1b1b",
    fontSize: 12,
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
    width: Dimensions.get("window").width * 0.65,
    marginRight: 0,
    marginTop: 30,
    marginLeft: 10,
    padding: 10,
    height: 350,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    color: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});
