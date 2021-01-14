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
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'


const Stack = createStackNavigator();
const fetchfonts = ()=>{
  return Font.loadAsync({
    'Poppins-Medium':require('./assets/fonts/Poppins-Medium.ttf'), 
    'Poppins-SemiBold':require('./assets/fonts/Poppins-SemiBold.ttf')
  })
}

const fontLoadingError = () =>{
  return(console.log('OOPS Font not Loaded'))
}



function App() {
  const [fontLoaded ,setFontLoaded] = React.useState(false)

  if(!fontLoaded){
    return (<AppLoading startAsync={fetchfonts}
      onFinish={()=>setFontLoaded(true)}
      onError={fontLoadingError}
    />
    );
  }
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
