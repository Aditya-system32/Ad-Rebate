import "react-native-gesture-handler";
import * as React from "react";
import { Button, View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./routes/Navigation";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { AuthContext } from "./routes/AuthProvider";
import * as firebase from "firebase";
import { set } from "react-native-reanimated";
import NavigationLogged from "./routes/NavigationLogged";
import { db } from "./firebases";
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
  const {
    user,
    setUser,
    userCompletedProfile,
    setUserCompletedProfile,
  } = React.useContext(AuthContext);
  const [initializing, setInitializing] = React.useState(true);
  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user !== null) {
      const userDoc = db.collection("Users").doc(user.uid);
      userDoc
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setUserCompletedProfile(true);
          } else {
            setUserCompletedProfile(false);
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  };

  React.useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
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
      {user ? <NavigationLogged /> : <Navigation />}
    </NavigationContainer>
  );
}

export default MainRoute;
