import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
export default function NotificationScreen() {
  //const [permission, setPermission] = useState();
  const registerForPushNotificationsAsync = async () => {
    //setPermission(await Notifications.getPermissionsAsync());
    //console.log(permission);
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    /*const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    this.setState({ expoPushToken: token });*/
  };
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <View>
      <Text>test</Text>
    </View>
  );
}
