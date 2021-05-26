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
import { ProgressBar, Colors } from "react-native-paper";
import { AuthContext } from "../routes/AuthProvider";
import { scaledSize } from "./Home";

export default function AdsVideoScreen({ navigation, route }) {
  const [selectedClient, setselectedClient] = useState(route.params.paramKey);
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState(route.params.categ);
  const [adCategoryData, setadCategoryData] = useState(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [progressBarStatus, setProgressBarStatus] = useState(0.0);
  const [qNa, setqNa] = useState(null);
  const randomNumber = Math.floor(Math.random() * 2 + 0);
  const videoData = [];
  const [play, setPlay] = useState(true);
  const [loop, setloop] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const { user, userData } = useContext(AuthContext);
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

  useEffect(() => {
    initiateAd();
    async function initiateAd() {
      db.collectionGroup("Ads")
        .where("city", "==", userData.location)
        .where("category", "==", cat)
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
    console.log(clientAdList);
    if (clientAdList !== undefined) {
      fetchPlayableLink(clientAdList[randomNumber].link);
    }
  }, [adCategoryData]);

  useEffect(() => {
    videoRef.current?.setStatusAsync({ progressUpdateIntervalMillis: 1 });
  }, [currentAd]);

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

  async function onPlaybackStatusUpdate(playbackStatus) {
    if (playbackStatus.isPlaying) {
      // Update your UI for the playing state console.log("hello2");
      //console.log((playbackStatus.positionMillis / 30000).toFixed(2));
      setProgressBarStatus(playbackStatus.positionMillis / 30000);
    } else {
      // Update your UI for the paused state
    }
    if (playbackStatus.didJustFinish) {
      if (currentAdIndex === 0) {
        //unload();
        //setCurrentAdIndex(currentAdIndex + 1);
        navigation.navigate("GetCoupon", {
          paramKey: selectedClient,
          categ: category,
        });
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
            progressUpdateIntervalMillis={1000}
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
    top: scaledSize(10),
    alignSelf: "center",
    right: scaledSize(10),
    backgroundColor: "rgba(209, 209, 209, 0.301)",
    width: scaledSize(40),
    height: scaledSize(40),
    flexDirection: "row",
    borderRadius: scaledSize(50),
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins-Medium",
  },
  adCurrentFont: {
    fontSize: scaledSize(18),
    fontFamily: "Poppins-Medium",
  },
  container: {
    flex: 1,
    position: "relative",
    height: Dimensions.get("window").height,
    backgroundColor: "black",
  },
});
