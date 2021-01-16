import 'react-native-gesture-handler';
import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  StatusBar,
} from "react-native";

export default function LogInScreen({ navigation }) {
  return (
    <View style = {styles.container}>
      <StatusBar backgroundColor='white' barStyle="dark-content" />
      <View style={styles.banner}>
          <Image></Image>
      </View>
      <View style={styles.welcomeBackWrapper}>
        <Text style={styles.welcomeBack}>Welcome</Text>
        <Text style={styles.welcomeBack}>Back</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#000",
  },
  banner: {
    height: "16%",
    backgroundColor: "#70007a",
    width: "100%",
    marginBottom: "2%",
  },
  welcomeBackWrapper:{
    marginLeft:"5%"
  },
  welcomeBack:{
    fontSize:28,
    fontFamily:"Poppins-Medium"
  },
})