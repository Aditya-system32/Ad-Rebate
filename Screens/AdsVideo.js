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
import Video from "react-native-video";
import { db } from "../firebases";
import { color } from "react-native-reanimated";

export default function AdsVideoScreen({ navigation, route }) {
  const [value, setValue] = useState(route.params.paramKey);
  const [adsSelectedData, setAdsSelectedData] = useState([]);
  const [adsOfSelectedClient, setAdsOfSelectedClient] = useState([]);
  const tempArray = [];
  const randomNumber = Math.floor(Math.random() * 2 + 0);
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
  /*tempArray.push(adsSelecteData.filter((client) => client.client == value));
  setAdsOfSelectedClient(tempArray);
  console.log(adsOfSelectedClient);
  /*videoPlayBack.push(
    adsOfSelectedClient[Math.floor(Math.random() * (2 - 0)) + 0]
  );*/
  //console.log(videoPlayBack);
  // const tempArray = []
  // adsSelecteData;
  // const adsOfSelectedClient = adsSelecteData.filter((client) => client.client == value)
  // const randomNo = 0
  // tempArray.push(adsOfSelectedClient[randomNo])
  // const adsExcludingSelectedClient = adsSelecteData.filter(client=>{
  //   client.client != value
  // })
  // for(let i = 0;i<2;i++){
  //   randomNo
  //   tempArray.push(adsExcludingSelectedClient[randomNo])
  // }

  tempArray.push(
    adsSelectedData.filter((client) => client.client == value)[randomNumber]
  );
  console.log(tempArray);

  //console.log(adsSelecteData.filter((client) => client.client != value).length);
  //console.log(videoPlayBack);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text>{value}</Text>
      <Video
        source={{
          uri:
            "https://firebasestorage.googleapis.com/v0/b/ad-rebate2020.appspot.com/o/ads%2FTusharBurger%2Fpexels-cottonbro-5486045.mp4?alt=media&token=ef521f1a-4f60-43c5-b0e6-fb7ced1894a5",
        }}
        onError={(err) => {
          console.log(err);
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
