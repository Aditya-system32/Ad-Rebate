import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function PushNotification() {
  useEffect(() => {
    const token = ""(async () => (token = await appMessaging.getToken()));
    console.log(token);
  }, []);

  return (
    <View>
      <Button title="request" onPress={() => console.log("clicked")} />
    </View>
  );
}
