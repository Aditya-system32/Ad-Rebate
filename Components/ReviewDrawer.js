import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { View as MotiView } from "moti";
import { Rating } from "react-native-ratings";
import { scaledSize } from "../Screens/Home";
import { AuthContext } from "../routes/AuthProvider";
import { db } from "../firebases";
import firebase from "firebase";

const ReviewDrawer = ({ setopenreview, id, setreviews, setmainrating }) => {
  const { user, setUserData, userData } = useContext(AuthContext);

  const [review, setreview] = useState("");
  const [rating, setrating] = useState(3);
  const [loading, setloading] = useState(false);
  async function submit() {
    setloading(true);
    let obj = {
      id: userData.id,
      name: userData.username,
      comment: review,
      rating: rating,
      date: new Date().getMilliseconds(),
    };

    db.collection("ClientData")
      .doc(id)
      .get()
      .then((doc) => {
        let prating = doc.data().rating;
        if (!prating) {
          setmainrating(rating);
          db.collection("ClientData")
            .doc(id)
            .set(
              {
                rating: rating,
                reviews: [obj],
              },
              { merge: true }
            )
            .then(() => {
              setreviews([obj]);
              ToastAndroid.showWithGravity(
                "Review sent",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            });
        } else {
          let newRating = Math.round((prating + rating) / 2);
          setmainrating(newRating);
          db.collection("ClientData")
            .doc(id)
            .set(
              {
                rating: newRating,
                reviews: firebase.firestore.FieldValue.arrayUnion(obj),
              },
              { merge: true }
            )
            .then(() => {
              setreviews((prev) => [...prev, obj]);
              ToastAndroid.showWithGravity(
                "Review sent",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            });
        }
      });
    setloading(false);
    setopenreview(false);
  }

  return (
    <MotiView
      // from={{ translateY: 300 }}
      // animate={{ translateY: 0 }}
      // exit={{ translateY: 300 }}
      // transition={{ type: "timing" }}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => setopenreview(false)}
        style={styles.down}
      >
        <AntDesign name="down" size={scaledSize(20)} color="#aaaaaa" />
      </TouchableOpacity>
      <Rating
        type="custom"
        tintColor="#1b1b1b"
        ratingColor="#ffc400"
        ratingBackgroundColor="#757575"
        startingValue={3}
        ratingTextColor="#fff"
        ratingCount={5}
        minValue={1}
        jumpValue={1}
        showRating
        onFinishRating={(num) => setrating(num)}
        style={{ paddingVertical: 10 }}
      />
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.textInput}
        onChangeText={(text) => setreview(text)}
        placeholder="Write your experience"
        textAlignVertical="top"
        selectionColor="#111111"
      ></TextInput>

      <View style={styles.buttonwrapper}>
        <TouchableNativeFeedback
          disable={loading}
          onPress={() => submit()}
          background={TouchableNativeFeedback.Ripple("#8f8f8f")}
        >
          <View style={styles.button}>
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.buttontext}>Submit</Text>
            )}
          </View>
        </TouchableNativeFeedback>
      </View>
    </MotiView>
  );
};

export default ReviewDrawer;

const styles = StyleSheet.create({
  down: {
    borderRadius: scaledSize(50),
    width: scaledSize(40),
    height: scaledSize(40),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: scaledSize(10),
    top: scaledSize(10),
  },
  textInput: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignSelf: "center",
    width: scaledSize(350),
    borderRadius: scaledSize(20),
    height: scaledSize(100),
    marginTop: scaledSize(20),
    alignItems: "flex-start",
    padding: scaledSize(10),
  },
  container: {
    position: "absolute",
    backgroundColor: "#1b1b1b",
    borderTopLeftRadius: scaledSize(20),
    borderTopRightRadius: scaledSize(20),
    height: scaledSize(350),
    width: "100%",
    bottom: 0,
    zIndex: 10,
    borderColor: "#444444",
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  buttontext: {
    color: "#ffffff",
    fontSize: scaledSize(14),
    fontFamily: "Poppins-Medium",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: scaledSize(158),
    borderRadius: scaledSize(20),
    height: scaledSize(48),
    borderColor: "#808080",
    borderStyle: "solid",
    borderWidth: scaledSize(1),
  },
  buttonwrapper: {
    width: scaledSize(158),
    borderRadius: scaledSize(20),
    height: scaledSize(48),
    overflow: "hidden",
    alignSelf: "center",
    marginTop: scaledSize(20),
  },
});
