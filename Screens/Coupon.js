import "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { scaledSize } from "./Home";
import { View as MotiView } from "moti";
export default function CouponScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [couponArray, setCouponArray] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [currentOption, setcurrentOption] = useState("active");
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [last, setlast] = useState(null);
  const [hideLoadMore, setHideLoadMore] = useState(false);
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
    if (user) {
      setLoading(true);
      var current = new Date();
      db.collectionGroup("Coupons")
        .where("allotedTo", "==", user.uid)
        .where("isRedeemed", "==", false)
        .where("expiryDateMs", ">=", Date.parse(current))
        .limit(8)
        .get()
        .then((snap) => {
          var lastVisible = snap.docs[snap.docs.length - 1];
          setNextPage(
            db
              .collectionGroup("Coupons")
              .where("allotedTo", "==", user.uid)
              .where("isRedeemed", "==", false)
              .where("expiryDateMs", ">=", Date.parse(current))
              .startAfter(lastVisible)
              .limit(8)
          );
          snap.forEach((doc) => {
            var aa = new Date();
            if (doc.data().activeFrom <= Date.parse(aa))
              setCouponArray((prev) => [...prev, doc.data()]);
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [user]);

  async function nextpageFunction() {
    if (last === undefined) return;
    setLoading(true);
    var current = new Date();

    nextPage
      .get()
      .then((snap) => {
        var lastVisible = snap.docs[snap.docs.length - 1];
        setlast(lastVisible);
        setNextPage(
          db
            .collectionGroup("Coupons")
            .where("allotedTo", "==", user.uid)
            .where("isRedeemed", "==", false)
            .where("expiryDateMs", ">=", Date.parse(current))
            .startAfter(lastVisible)
            .limit(8)
        );
        snap.forEach((doc) => {
          if (doc.data().activeFrom <= Date.parse(current))
            setCouponArray((prev) => [...prev, doc.data()]);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (last === undefined) {
      ToastAndroid.showWithGravity(
        "No more coupons found",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setHideLoadMore(true);
    }
  }, [last]);
  // for getting active users
  async function getActiveCoupons() {
    if (currentOption === "active") return;
    setLoading(true);
    setCouponArray([]);
    var current = new Date();
    db.collectionGroup("Coupons")
      .where("allotedTo", "==", user.uid)
      .where("isRedeemed", "==", false)
      .where("expiryDateMs", ">=", Date.parse(current))
      .limit(8)
      .get()
      .then((snap) => {
        var lastVisible = snap.docs[snap.docs.length - 1];
        setNextPage(
          db
            .collectionGroup("Coupons")
            .where("allotedTo", "==", user.uid)
            .where("isRedeemed", "==", false)
            .where("expiryDateMs", ">=", Date.parse(current))
            .startAfter(lastVisible)
            .limit(8)
        );
        snap.forEach((doc) => {
          if (doc.data().activeFrom <= Date.parse(current))
            setCouponArray((prev) => [...prev, doc.data()]);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  async function getExpiredCoupons() {
    if (currentOption === "expired") return;
    setLoading(true);
    var current = new Date();
    setCouponArray([]);
    db.collectionGroup("Coupons")
      .where("allotedTo", "==", user.uid)
      .where("isRedeemed", "==", false)
      .limit(8)
      .get()
      .then((snap) => {
        var lastVisible = snap.docs[snap.docs.length - 1];
        setNextPage(
          db
            .collectionGroup("Coupons")
            .where("allotedTo", "==", user.uid)
            .where("isRedeemed", "==", false)
            .startAfter(lastVisible)
            .limit(8)
        );
        snap.forEach((doc) => {
          if (doc.data().expiryDateMs <= Date.parse(current))
            setCouponArray((prev) => [...prev, doc.data()]);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  async function getAllCoupons() {
    if (currentOption === "all") return;
    setHideLoadMore(true);
    setLoading(true);
    setCouponArray([]);
    db.collectionGroup("Coupons")
      .where("allotedTo", "==", user.uid)
      .orderBy("activeFrom", "desc")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          setCouponArray((prev) => [...prev, doc.data()]);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  async function getRedeemedCoupons() {
    if (currentOption === "redeemed") return;
    setCouponArray([]);
    setLoading(true);
    db.collectionGroup("Coupons")
      .where("allotedTo", "==", user.uid)
      .where("isRedeemed", "==", true)
      .limit(8)
      .get()
      .then((snap) => {
        var lastVisible = snap.docs[snap.docs.length - 1];
        setNextPage(
          db
            .collectionGroup("Coupons")
            .where("allotedTo", "==", user.uid)
            .where("isRedeemed", "==", true)
            .startAfter(lastVisible)
            .limit(8)
        );
        snap.forEach((doc) => {
          setCouponArray((prev) => [...prev, doc.data()]);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
            <ActivityIndicator
              style={{ marginBottom: "30%" }}
              color="white"
            ></ActivityIndicator>
          </View>
        ) : (
          <FlatList
            data={couponArray}
            numColumns={2}
            alwaysBounceVertical={true}
            bounces={true}
            ListEmptyComponent={
              <Text
                style={{
                  color: "#ffc8c8",
                  fontFamily: "Poppins-Regular",
                  fontSize: scaledSize(12),
                  alignSelf: "center",
                  textAlignVertical: "center",
                  marginTop: Dimensions.get("screen").height * 0.38,
                }}
              >
                No coupon found.
              </Text>
            }
            onEndReached={() => setShowLoadMore(true)}
            ListFooterComponent={
              couponArray.length < 8 || hideLoadMore ? null : (
                <TouchableOpacity
                  onPress={nextpageFunction}
                  style={styles.loadMore}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Poppins-Regular",
                      fontSize: scaledSize(15),
                    }}
                  >
                    Load More
                  </Text>
                </TouchableOpacity>
              )
            }
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ alignItems: "center" }}
            renderItem={({ item }) => {
              const amPm = item.activeFromTime <= "12-00" ? "AM" : "PM";
              const hour = item.activeFromTime.split("-")[0] % 12;
              const timetoShow = hour + ":" + item.activeFromTime.split("-")[1];
              if (item.activeFromTime)
                return (
                  <MotiView
                    from={{
                      opacity: 0,
                      translateY: -50,
                    }}
                    animate={{
                      opacity: 1,
                      translateY: 0,
                    }}
                    style={styles.coupon}
                  >
                    <Image
                      style={styles.couponImage}
                      source={{
                        uri: item.clientLogo,
                      }}
                    ></Image>
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
                  </MotiView>
                );
            }}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadMore: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: scaledSize(178),
    borderRadius: scaledSize(20),
    height: scaledSize(58),
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: scaledSize(20),
  },
  option: {
    borderRadius: scaledSize(10),
    backgroundColor: "#1b1b1b",
    flex: 1,
    fontFamily: "Poppins-Light",
    margin: scaledSize(10),
    fontSize: scaledSize(10),
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
    height: scaledSize(60),
    width: "100%",
    flexDirection: "row",
  },

  couponImage: {
    height: scaledSize(100),
    resizeMode: "cover",
    borderRadius: scaledSize(5),
    width: "100%",
  },
  couponDiscount: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
    fontSize: scaledSize(12),
  },
  couponActiveFrom: {
    textAlign: "left",
    width: "100%",
    fontFamily: "Poppins-Regular",
    color: "#000000",
    fontSize: scaledSize(10),
  },
  couponTitle: {
    textAlign: "left",
    width: "100%",
    height: scaledSize(24),
    fontFamily: "Poppins-SemiBold",
    color: "#000000",
    fontSize: scaledSize(16),
  },
  couponId: {
    textAlign: "left",
    marginBottom: 2,
    width: "100%",
    height: scaledSize(9),
    textAlignVertical: "center",
    overflow: "scroll",
    fontFamily: "Poppins-Regular",
    color: "#1b1b1b",
    fontSize: scaledSize(7),
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
    paddingTop: scaledSize(10),
  },
  coupon: {
    width: Dimensions.get("window").width * 0.45,
    marginRight: 0,
    marginLeft: scaledSize(10),
    padding: scaledSize(10),
    borderRadius: scaledSize(20),
    backgroundColor: "#ffffff",
    marginBottom: scaledSize(10),
    color: "black",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
