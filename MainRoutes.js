import "react-native-gesture-handler";
import * as React from "react";
import { Button, View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from './routes/Navigation'
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { AuthContext } from "./routes/AuthProvider";
import * as firebase from 'firebase';
import { set } from "react-native-reanimated";


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

function MainRoute() {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const {user, setUser} = React.useContext(AuthContext) 
  const [initializing, setInitializing] = React.useState(true);
 
  const onAuthStateChanged = (user) =>{
    setUser(user);
    if(initializing) setInitializing(false);
  }    

  React.useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber
  }, []);

  if (!fontLoaded && initializing) {
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
      {user ? <Navigation /> : <Navigation />}
    </NavigationContainer>
  );
}

export default MainRoute;
