import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EarningScreen from './Screens/Earning'
import CouponScreen from './Screens/Coupon'
import HomeScreen from './Screens/Home'
import LogInScreen from './Screens/LogIn'
import SignUpScreen from './Screens/SignUp'
import VerificationScreen from './Screens/Verification'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Earning" component={EarningScreen} />
        <Stack.Screen name="Coupon" component={CouponScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
