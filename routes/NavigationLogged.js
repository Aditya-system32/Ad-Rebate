import * as React from "react";
import { StyleSheet } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import CouponScreen from "../Screens/Coupon";
import HomeScreen, { scaledSize } from "../Screens/Home";
import ReferAndEarn from "../Screens/ReferAndEarn";
import AboutScreen from "../Screens/About";
import ProfileScreen from "../Screens/ProfileUpdate";
import ProfileComplete from "../Screens/ProfileComplete";
import { FontAwesome } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./DrawerContent";
import BarcodeScanner from "../Screens/BarcodeScanner";
import { MaterialIcons } from "@expo/vector-icons";
import RedeemScreen from "../Screens/Redeem";
import TransactionScreen from "../Screens/Transaction";
import HelpScreen from "../Screens/Help";
import CategoriesScreen from "../Screens/Categories";
import AdsVideoScreen from "../Screens/AdsVideo";
import GetCoupon from "../Screens/GetCoupon";
import CouponRedeemed from "../Screens/CouponRedeemed";
import AppIntroSliders from "../Screens/AppIntroSliders";
import ShareCoupons from "../Screens/ShareCoupons";
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
            fontSize: scaledSize(20),
          },
          headerLeft: () => (
            <FontAwesome
              name="navicon"
              size={scaledSize(25)}
              color="white"
              style={styles.icons}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <MaterialIcons
              name="qr-code-scanner"
              size={scaledSize(25)}
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
            fontSize: scaledSize(18),
          },
        }}
      />
      <HomeStack.Screen
        name="AdsVideo"
        component={AdsVideoScreen}
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
        name="CouponRedeemed"
        component={CouponRedeemed}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: scaledSize(18),
          },
          headerLeft: () => {
            return null;
          },
        }}
      />
      <HomeStack.Screen
        name="ShareCoupons"
        component={ShareCoupons}
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
        name="Invite and earn"
        component={ReferAndEarn}
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
        name="Redeem"
        component={RedeemScreen}
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
        name="GetCoupon"
        component={GetCoupon}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Transactions"
        component={TransactionScreen}
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
        name="Profile"
        component={ProfileScreen}
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
        name="ProfileComplete"
        component={ProfileComplete}
        options={{
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: scaledSize(18),
          },
          headerLeft: () => {
            return null;
          },
        }}
      />
      <HomeStack.Screen
        name="AppIntroSliders"
        component={AppIntroSliders}
        options={{
          headerShown: false,
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
    marginLeft: scaledSize(10),
  },
  barcodeIcon: {
    marginRight: scaledSize(10),
  },
});
