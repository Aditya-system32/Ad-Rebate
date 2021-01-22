import * as React from "react";
import {
  Button,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import EarningScreen from "../Screens/Earning";
import CouponScreen from "../Screens/Coupon";
import HomeScreen from "../Screens/Home";
import AboutScreen from "../Screens/About";
import ProfileScreen from "../Screens/Profile";
import ProfileComplete from "../Screens/ProfileComplete";
import { FontAwesome } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./DrawerContent";

const HomeStack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
      <HomeStack.Screen
        name="Earning"
        component={EarningScreen}
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
});
