import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
