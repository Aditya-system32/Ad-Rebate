import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';


export default function EarningScreen({ navigation }) {
  return (
    <View style = {styles.container}>
      <Text>Earning Screen</Text>
        <Button
          title="Go to Earning... again"
          onPress={() => navigation.push('Earning')}
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
 }

const styles = StyleSheet.create({
  container:{
    flex: 1, alignItems: 'center', justifyContent: 'center' 
  }
})