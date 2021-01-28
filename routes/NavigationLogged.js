import * as React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CouponScreen from "../Screens/Coupon";
import HomeScreen from "../Screens/Home";
import AboutScreen from "../Screens/About";
import ProfileScreen from "../Screens/Profile";
import ProfileComplete from "../Screens/ProfileComplete";
import { FontAwesome } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./DrawerContent";
import BarcodeScanner from "../Screens/BarcodeScanner";
import { MaterialIcons } from "@expo/vector-icons";

const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

//SHOWING THE STACK WHEN THE USER LOGGED IN
const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Ad-Rebate",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
          },
          headerLeft: () => (
            <FontAwesome
              name="navicon"
              size={24}
              color="white"
              style={styles.icons}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <MaterialIcons
              name="qr-code-scanner"
              size={27}
              color="white"
              style={styles.barcodeIcon}
              onPress={() => navigation.navigate("Barcode")}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="Barcode"
        component={BarcodeScanner}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
          },
        }}
      />
      <HomeStack.Screen
        name="Coupon"
        component={CouponScreen}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
          },
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
          },
        }}
      />
      <HomeStack.Screen
        name="ProfileComplete"
        component={ProfileComplete}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
          },
        }}
      />
      <HomeStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

export default function NavigationLogged() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeStackScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icons: {
    marginLeft: 10,
  },
  barcodeIcon: {
    marginRight: 10,
  },
});
