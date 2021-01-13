import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/login'

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
    render()
    return(
      <AppLoading 
      startAsync={getFonts}
      onFinish={()=>setFontsLoaded(true)}
      />
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
