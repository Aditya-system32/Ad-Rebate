import "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import { Video } from "expo-av";
import { db } from "../firebases";
import { color } from "react-native-reanimated";
import { ProgressBar, Colors } from "react-native-paper";

export default function AdsVideoScreen({ navigation, route }) {
  const [selectedClient, setselectedClient] = useState(route.params.paramKey);
  const [adCategoryData, setadCategoryData] = useState(null);
  const [adsOfSelectedClient, setAdsOfSelectedClient] = useState([]);
  const [adsExcludingSelectedClient, setadsExcludingSelectedClient] = useState(
    []
  );
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [progressBarStatus, setProgressBarStatus] = useState(0.0);
  const tempArray = [];
  const [qAnswered, setqAnswered] = useState(false);
  const videoRef = useRef();
  const [qNa, setqNa] = useState(null);
  const randomNumber = Math.floor(Math.random() * 2 + 0);
  const randomNumberForExcluding = 0;
  const [showQnA, setshowQnA] = useState(false);
  const videoData = [];
  const [adDataToPlay, setadDataToPlay] = useState([]);
  const [currentAns, setCurrentAns] = useState(null);
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
  useEffect(() => {
    if (!currentAns) return;
    if (currentAns === qNa.correctAnswer) {
      setqAnswered(true);
    }
  }, [currentAns]);
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

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isPlaying) {
      // Update your UI for the playing state
      //console.log((playbackStatus.positionMillis / 30000).toFixed(2));
      setProgressBarStatus(playbackStatus.positionMillis / 30000);
    } else {
      // Update your UI for the paused state
    }

    if (playbackStatus.didJustFinish) {
      if (currentAdIndex == 2) {
        if (setqAnswered) {
          setshowQnA(false);
          navigation.navigate("GetCoupon", {
            paramKey: selectedClient,
          });
        } else {
          setCurrentAdIndex(2);
        }
      } else {
        setCurrentAdIndex(currentAdIndex + 1);
      }
    } else {
      setCurrentAdIndex(currentAdIndex);
    }
  };
  //console.log(adsSelecteData.filter((client) => client.client != value).length);
  //console.log(videoPlayBack);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {qNa ? (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{qNa.question}</Text>
          <TouchableNativeFeedback onClick={() => setCurrentAns(1)}>
            <Text style={styles.option}>{qNa.option1}</Text>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onClick={() => setCurrentAns(2)}>
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
            shouldPlay
            style={styles.video}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    width: "80%",
    borderRadius: 25,
    height: "25%",
    fontSize: 16,
    color: "white",
    backgroundColor: "#ff0000",
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
