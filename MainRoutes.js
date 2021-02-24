import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Navigation from "./routes/Navigation";
import * as Font from "expo-font";
import { AuthContext } from "./routes/AuthProvider";
import * as firebase from "firebase";
import NavigationLogged from "./routes/NavigationLogged";
import { View, Text, StyleSheet, Image } from "react-native";
import { cos } from "react-native-reanimated";
import AppLoading from "expo-app-loading";
import logoB from "./assets/images/logoB.png";
import logoA from "./assets/images/logoA.png";
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

  //Fonts Loading From Assests
  /*React.useEffect(() => {
    (async () =>
      await Font.loadAsync({
        "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
      }))();
  }, []);*/

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
    return (
      <View style={styles.container}>
        <Image style={styles.logoB} source={logoB}></Image>
        <Text style={styles.text}>Ad-Rebate loading...</Text>
      </View>
    );
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
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    marginTop: scaledSize(40),
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(14),
  },
});
