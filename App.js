import React , {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/login'
import AppLoading from 'expo-app-loading'


const getFonts = () => {
  return Font.loadAsync({
    'poppins-medium':require('./assets/fonts/Poppins-Medium.ttf'),
    'poppins-semibold':require('./assets/fonts/Poppins-SemiBold.ttf')
  });
}


export default function App() {
  const [fontsLoaded,setFontsLoaded] = useState(false);
  
  if(fontsLoaded){
    return(
      <Login />
    );
  }else{
    return(
      <AppLoading />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
