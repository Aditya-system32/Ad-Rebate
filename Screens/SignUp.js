import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, StyleSheet, StatusBar} from 'react-native';

export default function SignUpScreen({ navigation }) {
  return (
    <View style = {styles.container}>
    <StatusBar backgroundColor='white' barStyle="dark-content" />
      <Text>SignUp Screen</Text>
      <Button title="Register" onPress={() => navigation.navigate('Verification')} />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex: 1, alignItems: 'center', justifyContent: 'center' 
    }
  })