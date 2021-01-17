import * as React from "react";
import { Button, View, Text,StatusBar, StyleSheet, TouchableNativeFeedback } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import EarningScreen from "../Screens/Earning";
import CouponScreen from "../Screens/Coupon";
import HomeScreen from "../Screens/Home";
import LogInScreen from "../Screens/LogIn";
import SignUpScreen from "../Screens/SignUp";
import VerificationScreen from "../Screens/Verification";
import AboutScreen from "../Screens/About"
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContent} from './DrawerContent'


const HomeStack = createStackNavigator();
const CouponStack = createStackNavigator();
const Drawer = createDrawerNavigator();


const HomeStackScreen = ({navigation}) => {
  return(
    <HomeStack.Navigator>
    <HomeStack.Screen  name="Home" component={HomeScreen} options={{
    title: 'Ad-Rebate',
    headerTitleAlign:"center",
    headerStyle: {
     backgroundColor:"#000000"
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
    },
    headerLeft: () => (
      <FontAwesome name="navicon" size={24} color="white" style = {styles.icons} onPress={() => navigation.openDrawer()}/>
    ),
  }}/>
  <HomeStack.Screen name="Coupon" component={CouponScreen} options={{
    headerStyle: {
     backgroundColor:"#000000"
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
    },
  }} />
  <HomeStack.Screen name="LogIn" component={LogInScreen} options={{
    headerStyle: {
     backgroundColor:"#000000"
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
    },
  }} />
  <HomeStack.Screen name="SignUp" component={SignUpScreen} options={{
    headerStyle: {
     backgroundColor:"#000000"
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
    },
  }} />
  <HomeStack.Screen name="About" component={AboutScreen} options={{
    headerStyle: {
     backgroundColor:"#000000"
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
    },
  }}/>
  <HomeStack.Screen name="Verification" component={VerificationScreen} options={{
    headerStyle: {
     backgroundColor:"#000000"
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
    },
  }}/>
  <HomeStack.Screen name="Earning" component={EarningScreen} options={{
    headerStyle: {
     backgroundColor:"#000000"
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
    },
  }}/> 
  </HomeStack.Navigator>
  )
}

/*const CouponStackScreen = ({navigation}) => {
  return(
  <CouponStack.Navigator>
  <CouponStack.Screen name="Coupon" component={CouponScreen} options={{
    headerStyle: {
     backgroundColor:"#000000"
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontFamily:'Poppins-SemiBold',
    },
    headerLeft: () => (
      <Ionicons name="arrow-back" size={24} color="white" style = {styles.icons} onPress={() => navigation.goBack()}/>
    ),
  }}/>
  </CouponStack.Navigator>
  )}*/



export default function Navigation(){
  
    return(
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        {/*<Drawer.Screen name="Coupon" component={CouponStackScreen} /> */}
      </Drawer.Navigator>)
    {/*<Stack.Navigator initialRouteName="Home">
        <Stack.Screen  name="Home" component={HomeScreen} options={{
          title: 'Ad-Rebate',
          headerTitleAlign:"center",
          headerStyle: {
           backgroundColor:"#000000"
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontFamily:'Poppins-SemiBold',
          },
          headerLeft: () => (
            <TouchableNativeFeedback>
            <FontAwesome name="navicon" size={24} color="white" style = {styles.icons} />
            </TouchableNativeFeedback>
          ),
        }}/>
        <Stack.Screen name="Earning" component={EarningScreen} />
        <Stack.Screen name="Coupon" component={CouponScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
      </Stack.Navigator>*/
    }
}

const styles = StyleSheet.create({
  icons:{
    marginLeft:10
  }
})
