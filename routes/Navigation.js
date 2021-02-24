import React from "react";
import { StyleSheet } from "react-native";
import CouponScreen from "../Screens/Coupon";
import HomeScreen, { scaledSize } from "../Screens/Home";
import LogInScreen from "../Screens/LogIn";
import SignUpScreen from "../Screens/SignUp";
import VerificationScreen from "../Screens/Verification";
import AboutScreen from "../Screens/About";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerContent } from "./DrawerContent";
import { FontAwesome } from "@expo/vector-icons";
import HelpScreen from "../Screens/Help";
import CategoriesScreen from "../Screens/Categories";

const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

//SHOWING THE STACK WHEN THE USER NOT LOGGED IN
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
            fontSize: scaledSize(20),
          },
          headerLeft: () => (
            <FontAwesome
              name="navicon"
              size={scaledSize(18)}
              color="white"
              style={styles.icons}
              onPress={() => navigation.openDrawer()}
            />
          ),
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
            fontSize: scaledSize(18),
          },
        }}
      />
      <HomeStack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: scaledSize(18),
          },
        }}
      />
      <HomeStack.Screen
        name="Help"
        component={HelpScreen}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: scaledSize(18),
          },
        }}
      />
      <HomeStack.Screen
        name="LogIn"
        component={LogInScreen}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: scaledSize(18),
          },
          headerLeftContainerStyle: {
            padding: scaledSize(4),
          },
        }}
      />
      <HomeStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: scaledSize(18),
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
      <HomeStack.Screen
        name="Verification"
        component={VerificationScreen}
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

export default function Navigation() {
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
    marginLeft: scaledSize(10),
  },
});
