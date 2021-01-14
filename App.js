import "react-native-gesture-handler";
import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from './routes/Navigation'
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createDrawerNavigator } from '@react-navigation/drawer';


const fetchfonts = () => {
  return Font.loadAsync({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });
};

const fontLoadingError = () => {
  return console.log("OOPS Font not Loaded");
};

function App() {
  const [fontLoaded, setFontLoaded] = React.useState(false);

  

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchfonts}
        onFinish={() => setFontLoaded(true)}
        onError={fontLoadingError}
      />
    );
  }
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

export default App;
