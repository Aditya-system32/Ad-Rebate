import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Navigation from "./routes/Navigation";
import * as Font from "expo-font";
import { AuthContext } from "./routes/AuthProvider";
import * as firebase from "firebase";
import NavigationLogged from "./routes/NavigationLogged";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import { scaledSize } from "./Screens/Home";
const fetchFonts = () => {
  return Font.loadAsync({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
  });
};

const _onError = () => {
  console("Font Not Loaded");
};

export default function MainRoute() {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const { user, setUser } = React.useContext(AuthContext);
  const [initializing, setInitializing] = React.useState(true);
  const [appIsReady, setAppIsReady] = React.useState(false);
  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  React.useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  preventFromAutoHiding = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    prepareResources();
  };

  prepareResources = async () => {
    try {
      await performAPICalls();
      await downloadAssets();
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true, async () => {
        await SplashScreen.hideAsync();
      });
    }
  };


  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={_onError}
      />
    );
  }
  if (initializing && !appIsReady) {
    return <AppLoading autoHideSplash />;
  }
  return (
    <NavigationContainer theme={DarkTheme}>
      {user ? <NavigationLogged /> : <Navigation />}
    </NavigationContainer>
  );
}

async function performAPICalls() {}
async function downloadAssets() {}

const styles = StyleSheet.create({
  logoB: {
    width: scaledSize(150),
    height: scaledSize(150),
    resizeMode: "contain",
    position: "absolute",
    top: scaledSize(300),
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    color: "#8d8d8d",
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
    fontSize: scaledSize(12),
    position: "absolute",
    bottom: scaledSize(180),
  },
});
