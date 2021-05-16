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
  BackHandler,
  FlatList,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import TextTicker from "react-native-text-ticker";
import { globalstyles } from "../styles/global";
import cash from "../assets/images/currency.png";
import coupons from "../assets/svgs/coupons.png";
import { AuthContext } from "../routes/AuthProvider";
import { db } from "../firebases";
import { View as MotiView } from "moti";
import BannerImages from "./BannerImages";
import celeb1 from "../assets/images/celebration1.png";
import { AnimatePresence } from "moti";
import end from "../assets/images/end.png";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
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
      img: "https://i.ibb.co/dm6LWgx/coffee.png",
      key: "cafe",
      name: "Cafe",
      value: "cafe",
    },
    {
      img: "https://i.ibb.co/60L7sbV/Restaurant.png",
      key: "restaurant",
      name: "Restaurant",
      value: "restaurant",
    },
    {
      img: "https://i.ibb.co/Scnxtmt/Group-172.png",
      key: "essentials",
      name: "Essentials",
      value: "essentials",
    },
  ]);

  useEffect(() => {
    if (userData === null || user === null) return;
    const unsubscribe = db
      .collection("Admins")
      .doc("yIIxCnpmkjYUCupGgQNiCyNNZ9s2")
      .onSnapshot((doc, onError) => {
        let location = userData.location ?? "null";
        let x = doc.data().categories[location];
        setCategoriesButtons(x);
      });
    return () => unsubscribe();
  }, [userData, user]);
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

  //TAKING THE USER DATA FROM DATABASE
  useEffect(() => {
    if (user === null) {
      return;
    }
    // note this flag denote mount status
    var userDoc = db
      .collection("Users")
      .doc(user.uid)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          navigation.navigate("ProfileComplete");
        }
      });

    return () => {
      userDoc();
    };
  }, [user]);

  useEffect(() => {
    getBannerData();
    async function getBannerData() {
      var bannerDoc = db
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
          if (doc.exists) {
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
  }, []);

  //NOTIFICATION BAR IN THE HOME SCREEN
  useEffect(() => {
    xx();
    async function xx() {
      db.collection("Notification")
        .doc("notifications")
        .get()
        .then((doc) => {
          if (doc.exists) {
            setNotifiaction(doc.data().notification);
          } else {
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }, []);

  //TAKING THE BANNERS DATA FROM DATABASE
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
  //EARNING SECTION UPDATE ALERT
  const buttonAlert = () =>
    Alert.alert(
      "Update Alert",
      "This section will be available soon!",
      [{ text: "OK" }],
      { cancelable: false }
    );

  const skipAll = () => {
    setUserData({
      ...userData,
      couponsReceived: [],
    });
    db.collection("Users")
      .doc(user.uid)
      .set({ couponsReceived: [] }, { merge: true });
  };
  const [hidefade, sethidefade] = useState(false);
  return (
    <View style={globalstyles.container}>
      {hidefade ? null : (
        <MotiView
          from={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            // default settings for all style values
            type: "timing",
            duration: 500,
            // set a custom transition for scale
          }}
          onDidAnimate={() => sethidefade(true)}
          style={styles.bigCircle}
        ></MotiView>
      )}
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
            {user
              ? userData
                ? userData.location
                : "not specified yet"
              : "not specified yet"}
          </Text>
        </View>
      }
      <AnimatePresence>
        {userData && userData.couponsReceived.length > 0 ? (
          userData.couponsReceived.length === 1 ? (
            <MotiView
              from={{
                opacity: 0,
                scale: 0.9,
                translateY: 200,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                translateY: 0,
              }}
              transition={{
                type: "timing",
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                translateY: 200,
              }}
              style={styles.popUpCoupon}
            >
              <TouchableNativeFeedback onPress={skipAll}>
                <Image style={styles.popUpEnd} source={end}></Image>
              </TouchableNativeFeedback>

              <Text style={styles.bingo}>Bingoo!!</Text>
              <Text style={styles.popuptext}>Coupon Recieved</Text>
              <Text style={styles.popuptext2}>
                From : {userData.couponsReceived[0]}
              </Text>
              <Image style={styles.celeb} source={celeb1}></Image>
            </MotiView>
          ) : userData.couponsReceived.length > 1 ? (
            <MotiView
              from={{
                opacity: 0,
                scale: 0.9,
                translateY: 200,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                translateY: 0,
              }}
              transition={{
                type: "timing",
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                translateY: 200,
              }}
              style={styles.popUpCoupon}
            >
              <TouchableNativeFeedback onPress={skipAll}>
                <Image style={styles.popUpEnd} source={end}></Image>
              </TouchableNativeFeedback>

              <Text style={styles.bingo}>Bingoo!!</Text>
              <Text style={styles.popuptext}>Coupon Recieved</Text>
              <Text style={styles.popuptext2}>From :</Text>
              <ScrollView style={styles.popupmultiview}>
                {userData.couponsReceived.map((e) => {
                  //console.log(e);
                  return <Text style={styles.popuptext3}>{e}</Text>;
                })}
              </ScrollView>
            </MotiView>
          ) : null
        ) : null}
      </AnimatePresence>
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
            <Image style={styles.imgg} source={coupons}></Image>
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
                      item.value == "essentials"
                        ? navigation.navigate("Essentials")
                        : user
                        ? navigation.navigate("Categories", {
                            paramKey: item.value,
                          })
                        : alert("Login First")
                    }
                  >
                    <View style={styles.categoryTile}>
                      <Image
                        style={styles.tileLogo}
                        source={{ uri: item.img }}
                      ></Image>
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
  bigCircle: {
    width: 1000,
    height: "100%",
    alignSelf: "center",
    zIndex: 10,
    backgroundColor: "#1b1b1b",
  },
  celeb: {
    width: scaledSize(160),
    height: scaledSize(160),
    resizeMode: "contain",
    marginTop: scaledSize(40),
  },
  popupmultiview: {
    width: "100%",
  },
  popUpEnd: {
    width: scaledSize(30),
    position: "absolute",
    right: scaledSize(20),
    top: scaledSize(20),
    height: scaledSize(30),
  },
  popuptext3: {
    color: "white",
    height: scaledSize(50),
    width: "100%",
    textAlignVertical: "center",
    fontFamily: "Poppins-Medium",
    backgroundColor: "#242424",
    borderRadius: scaledSize(20),
    marginVertical: scaledSize(10),
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
    position: "relative",
    alignSelf: "center",
    width: "100%",
    height: "60%",
    alignItems: "center",
    paddingVertical: scaledSize(40),
    paddingHorizontal: scaledSize(20),
    borderTopLeftRadius: scaledSize(20),
    borderTopRightRadius: scaledSize(20),
    bottom: 0,
    zIndex: 1,
  },
  img: {
    width: scaledSize(125),
    resizeMode: "cover",
    height: scaledSize(125),
  },
  imgg: {
    width: scaledSize(125),
    resizeMode: "contain",
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
    borderRadius: scaledSize(100),
  },
  categoryItems: {
    flexDirection: "row",
    width: scaledSize(383),
    borderRadius: scaledSize(20),
    alignSelf: "center",
    flexWrap: "wrap",
  },
  categoryTile: {
    borderRadius: scaledSize(100),
    height: scaledSize(70),
    backgroundColor: "#000000",
    borderColor: "#000000",
    borderWidth: 2,
    width: scaledSize(70),
    margin: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonTitle: {
    color: "#000",
    fontSize: scaledSize(18),
    fontFamily: "Poppins-Medium",
  },
  loginButtonTitle: {
    color: "#ffffff",
    fontSize: scaledSize(18),
    fontFamily: "Poppins-Medium",
  },
  buttonWrapper: {
    marginBottom: scaledSize(20),
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    width: scaledSize(178),
    borderRadius: scaledSize(20),
    height: scaledSize(58),
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
  },
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
    width: scaledSize(178),
    borderRadius: scaledSize(20),
    height: scaledSize(58),
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
    padding: scaledSize(20),
    paddingBottom: scaledSize(25),
    flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: scaledSize(20),
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
    height: scaledSize(20),
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
    borderRadius: scaledSize(20),
    backgroundColor: "#FF005C",
    height: "100%",
  },
  texts: {
    borderRadius: scaledSize(20),
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(50),
    color: "#fff",
  },
});
