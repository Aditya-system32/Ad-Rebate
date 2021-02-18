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
  BackHandler,
} from "react-native";
import { Video } from "expo-av";
import { db } from "../firebases";
import { color } from "react-native-reanimated";
import { ProgressBar, Colors } from "react-native-paper";
import { AuthContext } from "../routes/AuthProvider";
import { isLoaded } from "expo-font";

export default function AdsVideoScreen({ navigation, route }) {
  const [selectedClient, setselectedClient] = useState(route.params.paramKey);
  const [loading, setLoading] = useState(false);
  const [adCategoryData, setadCategoryData] = useState(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [progressBarStatus, setProgressBarStatus] = useState(0.0);
  const [qAnswered, setqAnswered] = useState(false);
  const [qNa, setqNa] = useState(null);
  const randomNumber = Math.floor(Math.random() * 2 + 0);
  const [showQnA, setshowQnA] = useState(false);
  const videoData = [];
  const [play, setPlay] = useState(true);
  const [loop, setloop] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [adDataToPlay, setadDataToPlay] = useState([]);
  const { user, setUserData, setBannerData, userData } = useContext(
    AuthContext
  );
  const videoRef = useRef();
  useEffect(() => {
    const backAction = () => {
      let videoData = [];
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
        videoRef.current.replayAsync();
      }
    }
  }

  useEffect(() => {
    initiateAd();
    async function initiateAd() {
      db.collectionGroup("Ads")
        .where("city", "==", "bhilai")
        .where("category", "==", "cafe")
        .get()
        .then((snap) => {
          let x = [];
          snap.forEach((doc) => {
            x.push(doc.data());
          });
          setadCategoryData(x);
        });
    }
  }, []);
  useEffect(() => {
    if (adCategoryData === null) {
      return;
    }
    let clientAdList = adCategoryData.filter(
      (client) => client.client === selectedClient
    );
    fetchPlayableLink(clientAdList[randomNumber].link);
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

  async function fetchPlayableLink(link) {
    setLoading(true);
    fetch(`https://adrebate.herokuapp.com/api/getAd?adLink=${link}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCurrentAd(responseJson.link);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    console.log(currentAd);
  }, [currentAd]);
  async function onPlaybackStatusUpdate(playbackStatus) {
    if (playbackStatus.isPlaying) {
      // Update your UI for the playing state
      //console.log((playbackStatus.positionMillis / 30000).toFixed(2));
      setProgressBarStatus(playbackStatus.positionMillis / 30000);
    } else {
      // Update your UI for the paused state
    }
    if (playbackStatus.didJustFinish) {
      if (currentAdIndex === 2) {
        setPlay(false);
        setshowQnA(true);
      } else if (currentAdIndex === 1) {
        setLoading(true);
        let adsExSelCli = adCategoryData.filter(
          (client) => client.client !== selectedClient
        );
        const randomAd =
          adsExSelCli[Math.floor(Math.random() * adsExSelCli.length)];
        setqNa({
          id: randomAd.id,
          client: randomAd.client,
          question: randomAd.question,
          correctAnswer: randomAd.correctAnswer,
          option1: randomAd.option1,
          option2: randomAd.option2,
        });
        await fetchPlayableLink(randomAd.link);
        setLoading(false);
        setCurrentAdIndex(currentAdIndex + 1);
      } else if (currentAdIndex === 0) {
        setLoading(true);
        let adsExSelCli = adCategoryData.filter(
          (client) => client.client !== selectedClient
        );
        const randomAd =
          adsExSelCli[Math.floor(Math.random() * adsExSelCli.length)];
        await fetchPlayableLink(randomAd.link);
        setLoading(false);
        setCurrentAdIndex(currentAdIndex + 1);
      }
    }
  }
  //console.log(adsSelecteData.filter((client) => client.client != value).length);
  //console.log(videoPlayBack);
  if (loading)
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <ActivityIndicator
          style={{ alignSelf: "center", marginTop: "70%" }}
          size="large"
          color="#8d8d8d"
        ></ActivityIndicator>
      </View>
    );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {qNa && showQnA ? (
        <View elevation={5} style={styles.questionContainer}>
          <Text style={styles.question}>{qNa.question}</Text>
          <TouchableNativeFeedback onPress={() => checkAns(1)}>
            <Text style={styles.option}>{qNa.option1}</Text>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={() => checkAns(2)}>
            <Text style={styles.option}>{qNa.option2}</Text>
          </TouchableNativeFeedback>
        </View>
      ) : null}
      {loading ? (
        <View style={styles.adContainer}>
          <ActivityIndicator
            color="white"
            size="large"
            style={{ marginTop: "70%" }}
          ></ActivityIndicator>
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
              uri: currentAd,
            }}
            onPlaybackStatusUpdate={(playbackStatus) =>
              onPlaybackStatusUpdate(playbackStatus)
            }
            rate={1.0}
            ref={videoRef}
            volume={1.0}
            isLooping={loop}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={play}
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
    width: "90%",
    borderRadius: 10,
    height: "22%",
    fontSize: 15,
    fontFamily: "Poppins-Medium",
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.651)",
    backgroundColor: "rgba(82, 82, 82, 0.247)",
    paddingTop: "4.5%",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  question: {
    width: "100%",
    display: "flex",
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: "30%",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "rgba(255, 255, 255, 0.842)",
    paddingTop: "8%",
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
    backgroundColor: "#000000",
    borderRadius: 15,
    borderColor: "rgba(255, 255, 255, 0.842)",
    borderWidth: 1,
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
