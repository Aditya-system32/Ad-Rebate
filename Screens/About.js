import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, StyleSheet, StatusBar} from 'react-native';

export default function AboutScreen({ navigation }) {
  return (
    <View style = {styles.container}>
    <StatusBar backgroundColor='white' barStyle="dark-content" />
      <Text>Coupons</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, alignItems: 'center', justifyContent: 'center' 
  }
})