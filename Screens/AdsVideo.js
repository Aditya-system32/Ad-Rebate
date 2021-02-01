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

export default function AdsVideoScreen({ navigation, route }) {
  const [value, setValue] = useState(route.params.paramKey);
  const [adsSelecteData, setAdsSelectedData] = useState([]);
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

  //tempArray.push(adsSelecteData.filter((client) => client.client == value)

  //console.log(adsSelecteData.filter((client) => client.client != value).length);
  //console.log(videoPlayBack);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Text>{value}</Text>

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
