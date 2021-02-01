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

export default function AdsVideoScreen({ navigation, route }) {
  const [value, setValue] = useState(route.params.paramKey);
  const [adsSelectedData, setAdsSelectedData] = useState([]);
  const [adsOfSelectedClient, setAdsOfSelectedClient] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
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
    playbackStatus.didJustFinish
      ? currentAdIndex == 2
        ? setCurrentAdIndex(0)
        : setCurrentAdIndex(currentAdIndex + 1)
      : setCurrentAdIndex(currentAdIndex);
  };
  //console.log(adsSelecteData.filter((client) => client.client != value).length);
  //console.log(videoPlayBack);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text>{value}</Text>
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
          height: Dimensions.get("window").height,
        }}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
