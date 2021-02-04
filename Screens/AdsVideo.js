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
} from "react-native";
import { Video } from "expo-av";
import { db } from "../firebases";
import { color } from "react-native-reanimated";
import { ProgressBar, Colors } from "react-native-paper";

export default function AdsVideoScreen({ navigation, route }) {
  const [value, setValue] = useState(route.params.paramKey);
  const [adsSelectedData, setAdsSelectedData] = useState([]);
  const [adsOfSelectedClient, setAdsOfSelectedClient] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [progressBarStatus, setProgressBarStatus] = useState(0.0);
  const tempArray = [];
  const videoRef = useRef();
  const adsExcludingSelectedClient = [];
  const randomNumber = Math.floor(Math.random() * 2 + 0);
  const randomNumberForExcluding = 0;
  const videoData = [];
  useEffect(() => {
    const temp = [];
    (async () =>
      db
        .collectionGroup("Ads")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            //console.log("doc data" + doc.data());
            temp.push(doc.data());
            //console.log(doc.id, " => ", doc.data());
          });
          setAdsSelectedData(temp);
        }))();

    /*.catch(function (error) {
          console.log("Error getting document:", error);
        });*/
  }, []);
  /*useEffect(() => {
    //console.log(adsSelecteData);
  }, [adsSelecteData]);*/

  tempArray.push(
    adsSelectedData.filter((client) => client.client == value)[randomNumber]
  );
  //console.log(tempArray);
  videoData.push(tempArray[0]);
  for (let i = 0; i < 2; i++) {
    adsExcludingSelectedClient.push(
      adsSelectedData.filter((client) => client.client != value)[
        Math.floor(
          Math.random() *
            (adsSelectedData.filter((client) => client.client != value).length +
              0)
        )
      ]
    );
  }
  adsExcludingSelectedClient.forEach((element) => {
    videoData.push(element);
  });
  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isPlaying) {
      // Update your UI for the playing state
      //console.log((playbackStatus.positionMillis / 30000).toFixed(2));
      setProgressBarStatus(playbackStatus.positionMillis / 30000);
    } else {
      // Update your UI for the paused state
    }
    playbackStatus.didJustFinish
      ? currentAdIndex == 2
        ? navigation.navigate("GetCoupon", {
            paramKey: value,
          })
        : setCurrentAdIndex(currentAdIndex + 1)
      : setCurrentAdIndex(currentAdIndex);
  };
  //console.log(adsSelecteData.filter((client) => client.client != value).length);
  //console.log(videoPlayBack);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text>{value}</Text>
      <View>
        <Video
          source={{
            uri: videoData[currentAdIndex]
              ? videoData[currentAdIndex].link
              : "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          onPlaybackStatusUpdate={(playbackStatus) =>
            onPlaybackStatusUpdate(playbackStatus)
          }
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={{
            width: Dimensions.get("window").width,
            height: 300,
          }}
        />
        <ProgressBar
          progress={progressBarStatus}
          color={Colors.blue200}
          style={{
            height: 10,
            width: Dimensions.get("window").width,
            marginBottom: 200,
          }}
          visible={true}
        />
      </View>

      <Button
        title="Go back"
        onPress={() =>
          navigation.navigate("GetCoupon", {
            paramKey: value,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
