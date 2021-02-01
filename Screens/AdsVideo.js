import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { db } from "../firebases";
import { color } from "react-native-reanimated";
import { Video } from "expo-av";

export default function AdsVideoScreen({ navigation, route }) {
  const [value, setValue] = useState(route.params.paramKey);
  const [adsSelecteData, setAdsSelectedData] = useState([]);
  const [adsOfSelectedClient, setAdsOfSelectedClient] = useState([]);
  const tempArray = [];
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
    adsSelecteData.filter((client) => client.client == value)[randomNumber]
  );
  //console.log(tempArray);
  videoData.push(tempArray);
  for (let i = 0; i < 2; i++) {
    adsExcludingSelectedClient.push(
      adsSelecteData.filter((client) => client.client != value)[
        Math.floor(
          Math.random() *
            (adsSelecteData.filter((client) => client.client != value).length +
              0)
        )
      ]
    );
  }

  videoData.push(adsExcludingSelectedClient);
  console.log(videoData);

  //console.log(adsSelecteData.filter((client) => client.client != value).length);
  //console.log(videoPlayBack);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Video
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: 300, height: 300 }}
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
