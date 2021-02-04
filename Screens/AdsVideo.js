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
  useEffect(() => {
    let link = null;
    let fItem = null;
    if (adsSelectedData) {
      fItem = adsSelectedData.filter((client) => client.client == value)[
        randomNumber
      ];
    }
    if (fItem !== undefined && fItem !== null) {
      link = fItem.link;
      anyNameFunction(link);
    }
    // Create an scoped async function in the hook
    async function anyNameFunction(link) {
      fetch(`https://adrebate.herokuapp.com/api/getAd?adLink=${fItem.link}`, {
        method: "GET",
        //Request Type
      })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          //Success
          console.log(responseJson.link);
        })
        //If response is not in json then in error
        .catch((error) => {
          //Error
          console.error(error);
        });
    } // Execute the created function directly
  }, [adsSelectedData]);

  async function test() {
    fItem = adsSelectedData.filter((client) => client.client == value)[
      randomNumber
    ];
    fetch(`https://adrebate.herokuapp.com/api/getAd?adLink=${fItem.link}`, {
      method: "GET",
      //Request Type
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //Success
        console.log(responseJson.link);
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        console.error(error);
      });
  }
  // tempArray.push(
  //   fetch(`https://adrebate.herokuapp.com/api/getAd?adLink=${fItem}`)
  // );
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
      <Video
        source={{
          uri: videoData[currentAdIndex]
            ? videoData[currentAdIndex].link
            : "https://r3---sn-p5qs7nsk.googlevideo.com/videoplayback?expire=1612455772&ei=_MobYMLEJsXo8wSosJHQDQ&ip=34.228.24.45&id=o-ACYlUJOAa14XxCZAxpYxSAHOz4sWQBxgq4ZvGxZyv1qu&itag=22&source=youtube&requiressl=yes&mh=SX&mm=31%2C26&mn=sn-p5qs7nsk%2Csn-vgqsknes&ms=au%2Conr&mv=m&mvi=3&pl=12&pcm2=yes&initcwndbps=865000&vprv=1&mime=video%2Fmp4&ns=8ndQRWgGZysTfv6I2QPFaSoF&cnr=14&ratebypass=yes&dur=15.232&lmt=1470960920571895&mt=1612433824&fvip=3&c=WEB&n=sOFwdkGXZMHQ5RLBO&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhALthW8yElT2cYxG2K_1NNCo8wBrcO4GH29DFkfUuk0SAAiEAriKeIV6H15VSRAJ5_bb5n_BE8jzawzqamFldAgVCsyg%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgXF8FFSLsTo7LSx4jfl3P59jjsnCpvn9C6-IUzw6FMVcCIEuOxFT550k5IPJe1-6o-zrCAfugMVyr7bOfAl_M4Owo",
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
      <Button title="test" onPress={test} />
      <Button
        title="Go back"
        onPress={() =>
          navigation.navigate("GetCoupon", {
            paramKey: value,
          })
        }
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
