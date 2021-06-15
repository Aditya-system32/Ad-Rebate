import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
  Linking,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { db } from "../firebases";
import { scaledSize } from "./Home";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AnimatePresence } from "@motify/core";
import ReviewDrawer from "../Components/ReviewDrawer";
import { AuthContext } from "../routes/AuthProvider";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DiscountCake from "../Components/DiscountCake";
import { MaterialIcons } from "@expo/vector-icons";
const DetailsPage = ({ navigation, route }) => {
  const { user, setUserData, userData } = useContext(AuthContext);
  const { id, name, category, logo } = route.params;
  const [data, setdata] = useState(null);
  const [showimage, setshowimage] = useState(false);
  const [imagearray, setimagearray] = useState([]);
  const [openreview, setopenreview] = useState(false);
  const [mainrating, setmainrating] = useState(0);
  const [reviews, setreviews] = useState([]);
  const [openDiscount, setopenDiscount] = useState(false);
  useEffect(() => {
    if (!id) return;
    x();
    async function x() {
      db.collection("ClientData")
        .doc(id)
        .get()
        .then((doc) => {
          setdata(doc.data());
        });
    }
  }, [id]);
  useEffect(() => {
    if (!data) return;
    let arr = [];
    if (data.images) {
      data.images.forEach((url) => {
        arr.push({ url: url });
      });
    } else {
      arr.push({ url: logo });
    }
    setmainrating(data.rating);
    setreviews(data.reviews);
    setimagearray(arr);
  }, [data]);
  const openDialScreen = (ph) => {
    if (ph === "No Number") {
      ToastAndroid.showWithGravity(
        "Number not found",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      return;
    }
    let number = "";
    if (Platform.OS === "ios") {
      number = `telprompt:+91${ph}`;
    } else {
      number = `tel:${ph}`;
    }
    Linking.openURL(number);
  };

  return (
    <View style={styles.container}>
      <Modal
        onRequestClose={() => setshowimage(false)}
        animationType="slide"
        visible={showimage}
        transparent={true}
      >
        <TouchableOpacity
          onPress={() => setshowimage(false)}
          style={styles.down}
        >
          <AntDesign name="down" size={scaledSize(20)} color="#aaaaaa" />
        </TouchableOpacity>
        <ImageViewer imageUrls={imagearray} />
      </Modal>
      <AnimatePresence>
        {openreview ? (
          <ReviewDrawer
            setmainrating={setmainrating}
            setreviews={setreviews}
            reviews={reviews}
            id={id}
            setopenreview={setopenreview}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {openDiscount ? (
          <DiscountCake
            navigation={navigation}
            name={name}
            openDiscount={openDiscount}
            setopenDiscount={setopenDiscount}
            minAmount={data.minimumamount}
            id={id}
          ></DiscountCake>
        ) : null}
      </AnimatePresence>
      {data !== null ? (
        <SliderBox
          images={data.images ? data.images : [logo]}
          circleLoop={true}
          resizeMode="contain"
          dotColor="#757575"
          inactiveDotColor="#1a1a1a"
          resizeMethod="auto"
          sliderBoxHeight={Dimensions.get("screen").height * 0.2}
          parentWidth={Dimensions.get("screen").width}
          onCurrentImagePressed={(index) => {
            setshowimage(!showimage);
          }}
          ImageComponentStyle={styles.image}
        />
      ) : null}
      <TouchableOpacity
        style={styles.callWrapper}
        onPress={() => openDialScreen(data.clientPhone)}
      >
        <View style={styles.call}>
          <Text style={styles.calltext}>Call</Text>
          <Ionicons
            name="md-call-sharp"
            size={scaledSize(15)}
            color="#66ff94"
          />
        </View>
      </TouchableOpacity>
      <Text
        style={[
          styles.heading,
          name.length > 15
            ? {
                fontSize: scaledSize(20),
                textAlignVertical: "center",
                marginTop: scaledSize(12),
              }
            : null,
        ]}
      >
        {name}
      </Text>
      <View style={styles.locationbar}>
        <Entypo name="location-pin" size={scaledSize(14)} color="white" />
        <Text style={styles.locationtext}>{data?.clientAddress}</Text>
      </View>
      <View style={styles.ratingBarMain}>
        {data ? (
          <View style={[styles.ratingBar, { height: "100%" }]}>
            {[...Array(mainrating ? mainrating : 5)].map((item, index) => (
              <Ionicons
                style={styles.icon}
                key={index}
                name="ios-star"
                size={scaledSize(15)}
                color="#ffc400"
              />
            ))}
            <Text style={styles.ratingtext}>
              ({reviews ? reviews.length : 0})
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            let index = reviews
              ? reviews.findIndex((item) => item.id === userData.id)
              : -1;
            if (index === -1) {
              setopenreview(!openreview);
            } else {
              ToastAndroid.showWithGravity(
                "Already submitted",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            }
          }}
        >
          <View style={styles.rate}>
            <Text style={styles.ratetext}>Write Review</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AdsVideo", {
              paramKey: id,
              categ: category,
            });
          }}
        >
          <View style={styles.watch}>
            <Text style={styles.watchtext}>Watch Video</Text>
            <FontAwesome5
              name="play"
              size={scaledSize(12)}
              color="white"
              style={{ paddingRight: scaledSize(3) }}
            />
          </View>
        </TouchableOpacity>
        {data?.hasMenu ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Menu", {
                clientid: id,
                category: category,
                name: name,
              });
            }}
          >
            <View style={[styles.watch, { width: scaledSize(100) }]}>
              <Text style={styles.watchtext}>Menu</Text>
              <MaterialIcons
                name="menu-book"
                size={scaledSize(16)}
                color="white"
                style={{
                  paddingBottom: scaledSize(1),
                }}
              />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.review}>
        <Text style={styles.reviewHeading}>Ratings</Text>
        <View style={styles.lineartop} pointerEvents="none"></View>
        <LinearGradient
          style={styles.linear}
          colors={["transparent", "#000000"]}
          pointerEvents="none"
        ></LinearGradient>
        <ScrollView
          contentContainerStyle={{ paddingBottom: scaledSize(60) }}
          style={styles.reviewHolder}
        >
          {reviews ? (
            reviews.reverse().map((item, index) => {
              let date = new Date(item.date);
              return (
                <View key={`${item.name}${index}`} style={styles.reviewitem}>
                  <Text style={styles.reviewName}>{item.name}</Text>
                  <Text style={styles.reviewdate}>
                    {date.toLocaleDateString()}
                  </Text>
                  <Text style={styles.reviewcomment}>{item.comment}</Text>
                  <View style={styles.ratingBar}>
                    {[...Array(item.rating)].map((item, index) => (
                      <Ionicons
                        style={styles.icon}
                        key={index}
                        name="ios-star"
                        size={scaledSize(12)}
                        color="#ffc400"
                      />
                    ))}
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.noreview}>No reviews found</Text>
          )}
        </ScrollView>
      </View>
      <View style={styles.bottomBar}>
        {category === "cake" ? (
          <View style={styles.buttoncontainer}>
            <TouchableNativeFeedback onPress={() => setopenDiscount(true)}>
              <View style={styles.button}>
                <Text style={styles.buttontext}>Get Discount</Text>
                <MaterialCommunityIcons
                  style={{ paddingBottom: 2 }}
                  name="sack-percent"
                  size={scaledSize(18)}
                  color="#ffffff"
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        ) : (
          <View style={styles.buttoncontainer}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#646464")}
              onPress={() =>
                Linking.openURL(
                  `http://maps.google.com/?daddr=${name} ${data.clientAddress}`
                )
              }
            >
              <View style={styles.button}>
                <Text style={styles.buttontext}>Open Map</Text>
                <FontAwesome5
                  style={{ paddingBottom: 2 }}
                  name="map-marker-alt"
                  size={scaledSize(14)}
                  color="white"
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        )}
        {data?.whatsapp ? (
          <View style={styles.buttoncontainer}>
            <TouchableNativeFeedback
              onPress={() =>
                Linking.openURL(
                  "http://api.whatsapp.com/send?phone=" +
                    `+91${data.clientPhone}` +
                    `&text=Hello, i want to place an order \n- sent from Ad-Rebate`
                )
              }
            >
              <View style={styles.button}>
                <Text style={styles.buttontext}>Order On Whatsapp</Text>
                <FontAwesome
                  name="whatsapp"
                  size={scaledSize(22)}
                  color="#2cdb00"
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    width: "100%",
  },
  ratingtext: {
    color: "#a7a7a7",
    fontFamily: "Poppins-Regular",
    alignSelf: "center",
    fontSize: scaledSize(10),
    marginLeft: scaledSize(5),
    marginBottom: scaledSize(3),
  },
  noreview: {
    color: "#a7a7a7",
    fontFamily: "Poppins-Regular",
    alignSelf: "center",
    marginTop: scaledSize(135),
    fontSize: scaledSize(12),
  },
  down: {
    borderRadius: scaledSize(50),
    width: scaledSize(40),
    height: scaledSize(40),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: scaledSize(20),
    top: scaledSize(27),
    zIndex: 2,
  },
  watch: {
    borderWidth: 1,
    borderColor: "#707070",
    borderRadius: scaledSize(50),
    width: scaledSize(125),
    flexDirection: "row",
    height: scaledSize(35),
    alignItems: "center",
    marginLeft: scaledSize(11),
    marginTop: scaledSize(15),
    paddingHorizontal: scaledSize(10),
    justifyContent: "center",
    backgroundColor: "black",
  },
  watchtext: {
    color: "white",
    fontFamily: "Poppins-Medium",
    marginRight: scaledSize(5),
    paddingTop: scaledSize(2),
    fontSize: scaledSize(12),
  },
  calltext: {
    color: "white",
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(14),
    marginRight: scaledSize(5),
    color: "#ffffff",
    paddingTop: scaledSize(2),
  },
  call: {
    borderRadius: scaledSize(50),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#707070",
    borderWidth: 1,
    flexDirection: "row",
    flex: 1,
  },
  callWrapper: {
    position: "absolute",
    right: scaledSize(25),
    top: scaledSize(185),
    width: scaledSize(75),
    height: scaledSize(30),
    zIndex: 5,
  },
  ratetext: {
    color: "white",
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(10),
    paddingHorizontal: scaledSize(10),
    paddingTop: scaledSize(2),
  },
  rate: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scaledSize(6),
    borderColor: "#5d5d5d",
    borderWidth: 1,
    marginLeft: scaledSize(5),
  },
  ratingBarMain: {
    marginLeft: scaledSize(10),
    flexDirection: "row",
    alignItems: "center",
  },
  lineartop: {
    backgroundColor: "black",
    width: scaledSize(390),
    height: scaledSize(15),
    position: "absolute",
    top: scaledSize(12),
    zIndex: 2,
    marginHorizontal: scaledSize(10),
    borderTopLeftRadius: scaledSize(10),
    borderTopRightRadius: scaledSize(10),
    borderWidth: 1,
    borderColor: "#333",
    borderBottomWidth: 0,
  },
  linear: {
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: "#333",
    width: scaledSize(390),
    height: 100,
    position: "absolute",
    bottom: 0,
    zIndex: 4,
    marginHorizontal: scaledSize(10),
    borderBottomLeftRadius: scaledSize(10),
    borderBottomRightRadius: scaledSize(10),
  },
  icon: {
    marginHorizontal: scaledSize(2),
  },
  ratingBar: {
    flexDirection: "row",
    marginTop: scaledSize(5),
  },
  reviewcomment: {
    fontFamily: "Poppins-Medium",
    color: "#e6e6e6",
    fontSize: scaledSize(10),
  },
  reviewdate: {
    color: "#999999",
    position: "absolute",
    bottom: scaledSize(5),
    right: scaledSize(15),
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(9),
  },
  reviewName: {
    fontFamily: "Poppins-Medium",
    color: "white",
    fontSize: scaledSize(11),
  },
  reviewitem: {
    backgroundColor: "#1f1f1f",
    borderRadius: scaledSize(10),
    marginVertical: scaledSize(5),
    padding: 10,
  },
  reviewHolder: {
    backgroundColor: "black",
    marginHorizontal: 10,
    marginTop: 12,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  review: {
    backgroundColor: "black",
    height: scaledSize(340),
    marginTop: scaledSize(10),
    position: "relative",
    overflow: "hidden",
  },
  reviewHeading: {
    zIndex: 3,
    position: "absolute",
    top: 0,
    fontFamily: "Poppins-Medium",
    color: "white",
    paddingTop: scaledSize(3),
    marginLeft: scaledSize(25),
    backgroundColor: "black",
    width: scaledSize(60),
  },
  locationtext: {
    fontFamily: "Poppins-Regular",
    color: "white",
    marginTop: scaledSize(16),
    fontSize: scaledSize(10),
    height: "100%",
    paddingTop: scaledSize(3),
    marginLeft: scaledSize(6),
    width: scaledSize(370),
  },
  locationbar: {
    flexDirection: "row",
    paddingLeft: scaledSize(10),
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: scaledSize(10),
    zIndex: 3,
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: scaledSize(5),
  },
  buttoncontainer: {
    flex: 1,
    height: scaledSize(60),
    borderRadius: 20,
    overflow: "hidden",
    margin: scaledSize(5),
  },
  buttontext: {
    color: "#ffffff",
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(13),
    marginRight: scaledSize(10),
  },
  button: {
    height: scaledSize(60),
    backgroundColor: "#000000",
    alignSelf: "center",
    borderRadius: scaledSize(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: scaledSize(58),
    borderColor: "#333",
    borderStyle: "solid",
    borderWidth: scaledSize(1),
  },
  heading: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: scaledSize(30),
    marginLeft: scaledSize(10),
    marginTop: scaledSize(10),
    height: scaledSize(40),
  },
  container: {
    backgroundColor: "black",
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  image: {
    height: Dimensions.get("screen").height * 0.2,
    width: Dimensions.get("screen").width,
    resizeMode: "cover",
    backgroundColor: "black",
  },
});
