import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, StyleSheet ,StatusBar} from 'react-native';

export default function LogInScreen({ navigation }) {
  return (
    <View style = {styles.container}>
    <StatusBar backgroundColor='white' barStyle="dark-content" />
      <Text>LogIn Screen</Text>
      <Button title="LogIn" onPress={() => navigation.navigate('Home')} />

    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex: 1, alignItems: 'center', justifyContent: 'center' 
    }
  })