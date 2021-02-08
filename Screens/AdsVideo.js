import "react-native-gesture-handler";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  ToastAndroid,
  TouchableNativeFeedback,
} from "react-native";
import { Video } from "expo-av";
import { db } from "../firebases";
import { color } from "react-native-reanimated";
import { ProgressBar, Colors } from "react-native-paper";
import { AuthContext } from "../routes/AuthProvider";

export default function AdsVideoScreen({ navigation, route }) {
  const [selectedClient, setselectedClient] = useState(route.params.paramKey);
  const [adCategoryData, setadCategoryData] = useState(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(2);
  const [progressBarStatus, setProgressBarStatus] = useState(0.0);
  const [qAnswered, setqAnswered] = useState(false);
  const [qNa, setqNa] = useState(null);
  const randomNumber = Math.floor(Math.random() * 2 + 0);
  const [showQnA, setshowQnA] = useState(false);
  const videoData = [];
  const [adDataToPlay, setadDataToPlay] = useState([]);
  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );
  //for loading all ads from selected category
  useEffect(() => {
    const temp = [];
    (async () =>
      db
        .collectionGroup("Ads")
        .where("city", "==", "bhilai")
        .where("category", "==", "cafe")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            temp.push(doc.data());
          });
          setadCategoryData(temp);
        }))();
  }, []);

  //
<<<<<<< HEAD

  async function checkAns(ans) {
    if (ans === Number(qNa.correctAnswer)) {
      const current = new Date();
      const d =
        current.getDate() +
        "-" +
        (current.getMonth() + 1) +
        "-" +
        current.getFullYear();
      console.log(d);
      db.collection("ClientData")
        .doc(qNa.client)
        .collection("Ads")
        .doc(qNa.id)
        .collection("Reviews")
        .doc(user.uid)
        .set({
          client: qNa.client,
          date: d,
          userId: user.uid,
          username: userData.username,
          question: qNa.question,
        })
        .then(() => {
          console.log("saved to db");
          setqAnswered(true);
        })
        .catch((err) => console.log(err));
    } else {
      if (currentAdIndex === 2) {
        ToastAndroid.showWithGravity(
          "Wrong answer! Please watch Ad again",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setshowQnA(false);
        await setCurrentAdIndex(1);
        setCurrentAdIndex(2);
      }
=======
  useEffect(() => {
    if (!currentAns) return;
    if (currentAns === Number(qNa.correctAnswer)) {
      setqAnswered(true);
>>>>>>> 7c84f9aef7cdce757b95f5b3fa25a83f7b07611a
    }
  }
  useEffect(() => {
    let clientAd = {};
    let adsExSelCli = [];
    if (adCategoryData) {
      clientAd = adCategoryData.filter(
        (client) => client.client == selectedClient
      )[randomNumber];
      videoData.push(clientAd.link);

      adsExSelCli = adCategoryData.filter(
        (client) => client.client !== selectedClient
      );
      for (let i = 0; i < 2; i++) {
        const randomAd =
          adsExSelCli[
            Math.floor(
              Math.random() *
                adCategoryData.filter(
                  (client) => client.client != selectedClient
                ).length
            )
          ];
        if (i === 1) {
          setqNa({
            id: randomAd.id,
            client: randomAd.client,
            question: randomAd.question,
            correctAnswer: randomAd.correctAnswer,
            option1: randomAd.option1,
            option2: randomAd.option2,
          });
        }
        videoData.push(randomAd.link);
      }
      let addatavideos = [];

      if (videoData.length === 3) {
        videoData.forEach((element) => {
          anyNameFunction(element);
        });
        setadDataToPlay(addatavideos);
      }

      async function anyNameFunction(link) {
        fetch(`https://adrebate.herokuapp.com/api/getAd?adLink=${link}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setadDataToPlay((old) => [...old, responseJson.link]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [adCategoryData]);

  useEffect(() => {
    if (qAnswered) {
      setshowQnA(false);
      navigation.navigate("GetCoupon", {
        paramKey: selectedClient,
      });
    } else {
    }
  }, [qAnswered]);

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isPlaying) {
      // Update your UI for the playing state
      //console.log((playbackStatus.positionMillis / 30000).toFixed(2));
      setProgressBarStatus(playbackStatus.positionMillis / 30000);
    } else {
      // Update your UI for the paused state
    }

    if (playbackStatus.didJustFinish) {
      if (currentAdIndex === 2) {
        setshowQnA(true);
      } else {
        setCurrentAdIndex(currentAdIndex + 1);
      }
    } else {
    }
  };
  //console.log(adsSelecteData.filter((client) => client.client != value).length);
  //console.log(videoPlayBack);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {qNa && showQnA ? (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{qNa.question}</Text>
          <TouchableNativeFeedback onPress={() => checkAns(1)}>
            <Text style={styles.option}>{qNa.option1}</Text>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => checkAns(2)}>
            <Text style={styles.option}>{qNa.option2}</Text>
          </TouchableNativeFeedback>
        </View>
      ) : null}
      {adDataToPlay.length < 3 ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <View style={styles.adContainer}>
          <View style={styles.adCurrentIndex}>
            <Text style={styles.adCurrentFont}>{currentAdIndex + 1}</Text>
          </View>

          <ProgressBar
            progress={progressBarStatus}
            color={Colors.blue200}
            style={styles.progressBar}
            visible={true}
          />
          <Video
            source={{
              uri: adDataToPlay[currentAdIndex]
                ? adDataToPlay[currentAdIndex]
                : null,
            }}
            onPlaybackStatusUpdate={(playbackStatus) =>
              onPlaybackStatusUpdate(playbackStatus)
            }
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={true}
            style={styles.video}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  correctAnswer: {
    backgroundColor: "#5eca6c",
  },
  option: {
    width: "80%",
    borderRadius: 25,
    height: "25%",
    fontSize: 16,
    color: "white",
    backgroundColor: "#363636",
    padding: 10,
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  question: {
    width: "85%",
    borderRadius: 25,
    height: "30%",
    fontSize: 16,
    color: "white",
    backgroundColor: "black",
    padding: 20,
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  questionContainer: {
    marginTop: "50%",
    zIndex: 5,
    width: "80%",
    height: "30%",
    top: 0,
    backgroundColor: "rgba(51, 51, 51, 0.26)",
    borderRadius: 25,
    paddingTop: 40,
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
  },
  adContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    borderWidth: 2,
    borderStyle: "solid",
  },
  progressBar: {
    height: 5,
    width: Dimensions.get("window").width,
    backgroundColor: "black",
  },
  video: {
    zIndex: -1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    alignSelf: "center",
  },
  adCurrentIndex: {
    zIndex: 1,
    position: "absolute",
    top: 10,
    alignSelf: "center",
    right: 10,
    backgroundColor: "rgba(209, 209, 209, 0.301)",
    width: 40,
    height: 40,
    flexDirection: "row",
    borderRadius: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins-Medium",
  },
  adCurrentFont: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  container: {
    flex: 1,
    position: "relative",
    height: Dimensions.get("window").height,
    backgroundColor: "black",
  },
});
