import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

// Navigation Done but it has duplicating the stack

export default function HomeScreen({ navigation }) {
  return (
    <View style = {styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Earnings"
        onPress={() => navigation.navigate('Earning')}
      />
      <Button
        title="Go to Coupons"
        onPress={() => navigation.navigate('Coupon')}
      />
      <Button
        title="Go to LogIn"
        onPress={() => navigation.navigate('LogIn')}
      />
      <Button
        title="Go to SignUp"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, alignItems: 'center', justifyContent: 'center' 
  }
})