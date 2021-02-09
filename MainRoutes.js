import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./routes/Navigation";
import * as Font from "expo-font";
import { AuthContext } from "./routes/AuthProvider";
import * as firebase from "firebase";
import NavigationLogged from "./routes/NavigationLogged";
import { View, Text, StyleSheet } from "react-native";
import { cos } from "react-native-reanimated";

export default function MainRoute() {
  const [fontLoaded, setFontLoaded] = React.useState(false);
  const { user, setUser } = React.useContext(AuthContext);
  const [initializing, setInitializing] = React.useState(true);
  const [appIsReady, setAppIsReady] = React.useState(false);

  //Fonts Loading From Assests
  React.useEffect(() => {
    (async () =>
      await Font.loadAsync({
        "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
      }))();
  }, []);

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
      setFontLoaded(true);
      setAppIsReady(true, async () => {
        await SplashScreen.hideAsync();
      });
    }
  };

  if (initializing && !fontLoaded && !appIsReady) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Ad-Rebate</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <NavigationLogged /> : <Navigation />}
    </NavigationContainer>
  );
}

async function performAPICalls() {}
async function downloadAssets() {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
