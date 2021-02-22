import "react-native-gesture-handler";
import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Alert,
  StatusBar,
  SafeAreaView,
  Dimensions,
  ToastAndroid,
  BackHandler,
  FlatList,
  Button,
  View,
} from "react-native";
import { View as MView } from "moti";
import * as Notifications from "expo-notifications";
import TextTicker from "react-native-text-ticker";
import { globalstyles } from "../styles/global";
import cash from "../assets/images/currency.png";
import coffee from "../assets/images/coffee.png";
import restauraunt from "../assets/images/Restaurant.png";
import coupons from "../assets/svgs/coupons.png";
import { AuthContext } from "../routes/AuthProvider";
import { db } from "../firebases";
import BannerImages from "./BannerImages";
import celeb1 from "../assets/images/celebration1.png";
import * as firebase from "firebase";
import end from "../assets/images/end.png";
import { useDispatch, useSelector } from "react-redux";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const { width, height } = Dimensions.get("window");

const baseWidth = 411;
const baseHeight = 771;
const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = (size) => Math.ceil(size * scale);

export default function HomeScreen({ navigation }) {
  const { user, setUserData, userData } = useContext(AuthContext);
  const [pushnotification, setPushNotification] = useState(false);
  const dispatch = useDispatch();
  const bannerData = useSelector((state) => state.bannerData.banners);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotifiaction] = useState();
  const [backPressed, setBackPressed] = useState(0);
  const [categoriesButtons, setCategoriesButtons] = useState([
    {
      name: "Cafe",
      value: "cafe",
      img: coffee,
      key: "1",
    },
    {
      name: "Restaurant",
      value: "restaurant",
      img: restauraunt,
      key: "5",
    },
  ]);

  useEffect(() => {
    const backAction = () => {
      /*if (backPressed > 0) {
        BackHandler.exitApp();
        setBackPressed(0);
      } else {
        setBackPressed(backPressed + 1);
        ToastAndroid.show("Press Again To Exit", ToastAndroid.SHORT);
        setTimeout(() => setBackPressed(0), 2000);}*/
      BackHandler.exitApp();
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
    //console.log(bannerData);
  }, [bannerData]);
  //TAKING THE USER DATA FROM DATABASE
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    checkUser();
    async function checkUser() {
      if (user !== null && isMounted) {
        const userDoc = db.collection("Users").doc(user.uid);
        userDoc.onSnapshot(function (doc) {
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            navigation.navigate("ProfileComplete");
          }
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  //NOTIFICATION BAR IN THE HOME SCREEN
  useEffect(() => {
    let isMounted = true;
    const noti = db.collection("Notification").doc("notifications");
    noti
      .get()
      .then(function (doc) {
        if (doc.exists && isMounted) {
          setNotifiaction(doc.data().notification);
        } else {
          //navigation.navigate("ProfileComplete");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  //TAKING THE BANNERS DATA FROM DATABASE
  useEffect(() => {
    let isMounted = true;
    if (true) {
      const bannerDoc = db
        .collection("Banners")
        .doc(
          userData == undefined
            ? "bhilai"
            : userData.location == null || userData.location === ""
            ? "bhilai"
            : userData.location
        );
      bannerDoc
        .get()
        .then(function (doc) {
          if (doc.exists && isMounted) {
            dispatch({
              type: "updateBanner",
              array: doc.data().banners,
            });
          } else {
            // console.log("error");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // This listener is fired when user receive notification
  notificationListener.current = Notifications.addNotificationReceivedListener(
    (notification) => {
      setPushNotification(notification);
    }
  );

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  responseListener.current = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      console.log(response);
    }
  );

  //EARNING THE UPDATE ALERT
  const buttonAlert = () =>
    Alert.alert(
      "Update Alert",
      "This section will be available soon!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK" },
      ],
      { cancelable: false }
    );
  const skipAll = () => {
    console.log("aaa");
    setUserData({
      ...userData,
      couponsReceived: [],
    });
    console.log("run");
    db.collection("Users")
      .doc(user.uid)
      .set({ couponsReceived: [] }, { merge: true });
  };
  useEffect(() => {
    console.log(userData?.couponsReceived);
  }, [userData]);
  return (
    <View style={globalstyles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.banner}>
        <BannerImages />
      </View>
      {notification === null ||
      notification === "" ||
      notification === undefined ||
      !user ? null : (
        <View>
          <TextTicker
            style={{
              fontSize: 16,
              color: "#dadada",
              height: 50,
              width: "100%",
              paddingHorizontal: 15,
              marginTop: 10,
              fontFamily: "Poppins-Regular",
            }}
            duration={13000}
            loop
            bounce={false}
            marqueeOnMount={true}
            animationType="scroll"
            shouldAnimateTreshold={0}
            repeatSpacer={10}
            marqueeDelay={0}
          >
            {notification}
          </TextTicker>
        </View>
      )}
      {
        <View style={styles.location}>
          <Text style={styles.locationText}>
            Current location :{" "}
            {userData ? userData.location : "not specified yet"}
          </Text>
        </View>
      }
      {userData && userData.couponsReceived.length > 0 ? (
        userData.couponsReceived.length === 1 ? (
          <View style={styles.popUpCoupon}>
            <TouchableNativeFeedback onPress={skipAll}>
              <Image style={styles.popUpEnd} source={end}></Image>
            </TouchableNativeFeedback>

            <Text style={styles.bingo}>Bingoo!!</Text>
            <Text style={styles.popuptext}>Coupon Recieved</Text>
            <Text style={styles.popuptext2}>
              From : {userData.couponsReceived[0]}
            </Text>
            <Image style={styles.celeb} source={celeb1}></Image>
          </View>
        ) : userData.couponsReceived.length > 1 ? (
          <View style={styles.popUpCoupon}>
            <TouchableNativeFeedback onPress={skipAll}>
              <Image style={styles.popUpEnd} source={end}></Image>
            </TouchableNativeFeedback>

            <Text style={styles.bingo}>Bingoo!!</Text>
            <Text style={styles.popuptext}>Coupon Recieved</Text>
            <Text style={styles.popuptext2}>From :</Text>
            <ScrollView style={styles.popupmultiview}>
              {userData.couponsReceived.map((e) => {
                console.log(e);
                return <Text style={styles.popuptext3}>{e}</Text>;
              })}
            </ScrollView>
          </View>
        ) : null
      ) : null}
      <View style={styles.wrapper}>
        <TouchableNativeFeedback onPress={buttonAlert}>
          <View style={[styles.card, styles.cashCard]}>
            <Image style={styles.img} source={cash}></Image>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() =>
            user ? navigation.navigate("Coupon") : alert("Login First")
          }
        >
          <View style={styles.card}>
            <Image source={coupons}></Image>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.categoryWrapper}>
        <Text style={styles.categoryHeading}>Categories</Text>
        <View>
          <SafeAreaView style={styles.categoryItems}>
            <FlatList
              style={styles.category}
              data={categoriesButtons}
              numColumns={4}
              renderItem={({ item }) => (
                <View style={styles.itemWrapper}>
                  <TouchableNativeFeedback
                    onPress={() =>
                      user
                        ? navigation.navigate("Categories", {
                            paramKey: item.value,
                          })
                        : alert("Login First")
                    }
                  >
                    <View style={styles.categoryTile}>
                      <Image style={styles.tileLogo} source={item.img}></Image>
                    </View>
                  </TouchableNativeFeedback>
                  <Text style={styles.categoryItemTitle}>{item.name}</Text>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
      </View>

      {!user ? (
        <View style={styles.buttonWrapper}>
          <TouchableNativeFeedback
            useForeground={true}
            onPress={() => navigation.navigate("LogIn")}
          >
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonTitle}>Login</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate("SignUp")}
          >
            <View style={styles.registerButton}>
              <Text style={styles.registerButtonTitle}>Register</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  celeb: {
    width: scaledSize(160),
    height: scaledSize(160),
    resizeMode: "contain",
    marginTop: 40,
  },
  popupmultiview: {
    width: "100%",
  },
  popUpEnd: {
    width: scaledSize(30),
    position: "absolute",
    right: 20,
    top: 20,
    height: scaledSize(30),
  },
  popuptext3: {
    color: "white",
    height: scaledSize(50),
    width: "100%",
    textAlignVertical: "center",
    fontFamily: "Poppins-Medium",
    backgroundColor: "#242424",
    borderRadius: 20,
    marginVertical: 10,
    textAlign: "center",
    fontSize: scaledSize(20),
  },
  popuptext2: {
    color: "#dadada",
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(18),
  },
  popuptext: {
    color: "white",
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(20),
  },
  bingo: {
    fontSize: scaledSize(30),
    fontFamily: "Poppins-SemiBold",
    color: "#4aff43",
  },
  popUpCoupon: {
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#4b4b4b",
    borderBottomWidth: 0,
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    height: "60%",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    zIndex: 1,
  },
  img: {
    width: scaledSize(125),
    resizeMode: "cover",
    height: scaledSize(125),
  },
  categoryItemTitle: { color: "white" },
  itemWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  tileLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 100,
  },
  categoryItems: {
    flexDirection: "row",
    width: 383,
    borderRadius: 20,
    alignSelf: "center",
    flexWrap: "wrap",
  },
  categoryTile: {
    borderRadius: 100,
    height: 70,
    backgroundColor: "#000000",
    borderColor: "#000000",
    borderWidth: 2,
    width: 70,
    margin: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonTitle: {
    color: "#000",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  loginButtonTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  buttonWrapper: {
    marginBottom: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 178,
    borderRadius: 20,
    height: 58,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
  },
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 178,
    borderRadius: 20,
    height: 58,
    backgroundColor: "#00BEB3",
  },
  categoryHeading: {
    fontSize: scaledSize(16),
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    marginBottom: "1.5%",
  },
  category: {
    backgroundColor: "#161616",
    padding: 20,
    paddingBottom: 25,
    width: 383,
    flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 20,
    alignSelf: "center",
  },
  categoryWrapper: {
    marginBottom: "14%",
    height: "38%",
    alignSelf: "center",
  },
  locationText: {
    marginBottom: "3%",
    marginLeft: "5%",
    fontFamily: "Poppins-Regular",
    color: "#a8a8a8",
    fontSize: scaledSize(12),
    height: 20,
  },
  banner: {
    height: "20%",
    marginTop: 5,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: "2%",
  },
  wrapper: {
    marginBottom: "2%",
    flexDirection: "row",
    height: "20%",
    width: "100%",
    justifyContent: "space-evenly",
  },
  card: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FF005C",
    height: "100%",
  },
  texts: {
    borderRadius: 20,
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(50),
    color: "#fff",
  },
});
