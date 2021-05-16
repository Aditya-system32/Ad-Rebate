import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  Touchable,
  TouchableNativeFeedback,
  View,
  Dimensions,
} from "react-native";
import { db } from "../firebases";
import { View as MotiView, AnimatePresence } from "moti";
import { scaledSize } from "./Home";
import { AuthContext } from "../routes/AuthProvider";
import firebase from "firebase";
const Poll = () => {
  const { user } = useContext(AuthContext);
  const [showResult, setshowResult] = useState(false);
  const [total, settotal] = useState(0);
  const [heading, setheading] = useState("Choose a category");
  const [data, setdata] = useState([]);
  const [responses, setresponses] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [other, setother] = useState("");
  useEffect(() => {
    db.collection("Polls")
      .doc("AddCategory")
      .get()
      .then((doc) => {
        let docdata = doc.data();
        console.log(docdata);
        setresponses(docdata.Responses);
        settotal(docdata.Total);
        docdata.pollOptions.forEach((element) => {
          let exist = false;
          data.forEach((item) => {
            if (item.name === element) exist = true;
          });
          if (!exist) {
            setdata((prev) => [
              ...prev,
              { name: element, value: docdata[element] },
            ]);
          }
        });
      });
  }, []);

  useEffect(() => {
    responses.forEach((item) => {
      if (item.user === user.uid) {
        console.log("already voted");
        setheading(
          `You voted for ${
            item.response !== "Jewellery" &&
            item.response !== "Electronics" &&
            item.response !== "Real estate"
              ? "Other(" + item.response + ")"
              : item.response
          }`
        );
        setSelectedOption(item);
        setshowResult(true);
      }
    });
  }, [responses]);

  useEffect(() => {
    if (other !== "") setSelectedOption({ user: user.uid, response: other });
  }, [other]);
  async function handleSubmit() {
    if (selectedOption === null) {
      ToastAndroid.showWithGravity(
        "Please select an option first",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } else {
      if (
        selectedOption.response !== "Jewellery" &&
        selectedOption.response !== "Electronics" &&
        selectedOption.response !== "Real estate"
      ) {
        let index = data.findIndex((item) => item.name === "Other");
        let nde = [...data];
        nde[index].value = data[index].value + 1;
        console.log(nde);
        setdata(nde);
        db.collection("Polls")
          .doc("AddCategory")
          .set(
            {
              Other: firebase.firestore.FieldValue.increment(1),
              Responses:
                firebase.firestore.FieldValue.arrayUnion(selectedOption),
              Total: firebase.firestore.FieldValue.increment(1),
            },
            { merge: true }
          )
          .then(() => {
            setshowResult(true);
            ToastAndroid.showWithGravity(
              "Vote Registered",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          });
      } else {
        let index = data.findIndex(
          (item) => item.name === selectedOption.response
        );
        let nde = [...data];
        nde[index].value = data[index].value + 1;
        setdata(nde);
        db.collection("Polls")
          .doc("AddCategory")
          .set(
            {
              [selectedOption.response]:
                firebase.firestore.FieldValue.increment(1),
              Responses:
                firebase.firestore.FieldValue.arrayUnion(selectedOption),
              Total: firebase.firestore.FieldValue.increment(1),
            },
            { merge: true }
          )
          .then(() => {
            setshowResult(true);
            ToastAndroid.showWithGravity(
              "Vote Registered",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          });
      }
      settotal((prev) => prev + 1);
    }
  }
  return (
    <View>
      <Text style={styles.head}>{heading}</Text>
      {showResult ? (
        <View style={styles.result}>
          {data.map((item) => {
            return (
              <View style={styles.item}>
                <MotiView
                  delay={100}
                  transition={{
                    type: "timing",
                    duration: 600,
                  }}
                  from={{ translateX: -300 }}
                  animate={{ translateX: 0 }}
                  style={[
                    styles.backgroundAnimation,
                    { width: `${(item.value / total) * 100}%` },
                  ]}
                ></MotiView>
                <Text style={[styles.itemText]}>
                  {item.name}
                  {" - " + item.value}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View>
          {data.map((item) => {
            if (item.name === "Other") {
              console.log(selectedOption?.response);
              return (
                <MotiView style={styles.item}>
                  <TextInput
                    value={other}
                    onChangeText={(text) => {
                      setother(text);
                    }}
                    pointerEvents="none"
                    autoFocus={false}
                    onTouchStart={() => {
                      setSelectedOption({ user: user.uid, response: other });
                    }}
                    placeholder={item.name}
                    placeholderTextColor={
                      selectedOption !== null &&
                      selectedOption?.response !== "Jewellery" &&
                      selectedOption?.response !== "Electronics" &&
                      selectedOption?.response !== "Real estate"
                        ? "black"
                        : "white"
                    }
                    style={[
                      styles.itemTextInput,
                      selectedOption !== null &&
                      selectedOption?.response !== "Jewellery" &&
                      selectedOption?.response !== "Electronics" &&
                      selectedOption?.response !== "Real estate"
                        ? { backgroundColor: "white", color: "black" }
                        : null,
                    ]}
                  ></TextInput>
                </MotiView>
              );
            }
            return (
              <TouchableNativeFeedback
                onPress={() => {
                  setSelectedOption({ user: user.uid, response: item.name });
                }}
              >
                <MotiView
                  style={[
                    styles.item,
                    item.name === selectedOption?.response
                      ? { backgroundColor: "white", color: "black" }
                      : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.itemText,
                      item.name === selectedOption?.response
                        ? { color: "black" }
                        : null,
                    ]}
                  >
                    {item.name}
                  </Text>
                </MotiView>
              </TouchableNativeFeedback>
            );
          })}
        </View>
      )}
      {!showResult ? (
        <View style={styles.buttonWrapper}>
          <TouchableNativeFeedback onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttontxt}>Vote</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      ) : null}
    </View>
  );
};

export default Poll;

const styles = StyleSheet.create({
  result: {
    position: "relative",
    width: Dimensions.get("screen").width,
    alignItems: "center",
  },
  backgroundAnimation: {
    left: 0,
    top: 0,
    height: scaledSize(50),
    width: "100%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: "#FF005C",
    zIndex: 1,
    position: "absolute",
  },
  buttontxt: {
    color: "#ffffff",
    fontSize: scaledSize(18),
    fontFamily: "Poppins-Medium",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: scaledSize(178),
    borderRadius: scaledSize(20),
    height: scaledSize(58),
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: scaledSize(1),
    marginTop: scaledSize(100),
  },
  head: {
    color: "white",
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(20),
    marginTop: scaledSize(120),
    marginBottom: scaledSize(50),
  },
  item: {
    backgroundColor: "#252525",
    borderRadius: 15,
    width: "90%",
    height: scaledSize(50),
    alignSelf: "center",
    margin: scaledSize(6),
    zIndex: 2,
    overflow: "hidden",
  },
  itemText: {
    fontFamily: "Poppins-Regular",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    height: scaledSize(50),
    fontSize: scaledSize(14),
    zIndex: 3,
  },
  itemTextInput: {
    fontFamily: "Poppins-Regular",
    width: "100%",
    color: "white",
    textAlign: "center",
    height: scaledSize(50),
    textAlignVertical: "center",
  },
});
