import "react-native-gesture-handler";
import * as React from "react";
import CheckBox from "@react-native-community/checkbox";
import {AuthContext} from '../routes/AuthProvider'
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export default function SignUpScreen({ navigation }) {
  const {register,phoneLogin} = React.useContext(AuthContext)
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [password, setPassword] = React.useState();


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View style={styles.banner}>
        <Image></Image>
      </View>
      <View style={styles.welcomeBackWrapper}>
        <Text style={styles.welcomeBack}>Create</Text>
        <Text style={styles.welcomeBack}>Account</Text>
      </View>
      <View>
        <TextInput
          style={styles.textinput}
          placeholder="Phone no."
          placeholderTextColor="#EDEDED"
          color="#fff"
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        ></TextInput>
      </View>
      <View>
        <TextInput
          style={[styles.textinput, styles.textPassword]}
          placeholder="Password"
          placeholderTextColor="#EDEDED"
          color="#fff"
          secureTextEntry={true}
          onChangeText={(userPassword) => setPassword(userPassword)}
        ></TextInput>
      </View>
      <View style={styles.termsCondition}>
        <CheckBox tintColors={{ true: "#F15927", false: "#Fff" }} />
        <Text style={styles.forgetPass}>Agree to terms and conditions</Text>
      </View>
      <View style={styles.loginWrapper}>
        <TouchableNativeFeedback
          useForeground={true}
          onPress={() =>
            navigation.navigate('Verification', {
              paramKey: phoneNumber,
            })
          }
        >
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonTitle}>Register</Text>
          </View>
        </TouchableNativeFeedback>
        <View>
          <Text style={styles.registerHere} onPress={()=>navigation.navigate('LogIn')}>Already a user? Login</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  termsCondition: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loginWrapper: {
    marginTop: 70,
  },
  registerHere: {
    color: "#D3D3D3",
    alignSelf: "center",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 178,
    borderRadius: 20,
    height: 58,
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
  },
  loginButtonTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  banner: {
    height: "16%",
    backgroundColor: "#70007a",
    width: "100%",
    marginBottom: "2%",
  },
  welcomeBackWrapper: {
    marginBottom: 57,
    marginTop: 57,
  },
  welcomeBack: {
    fontSize: 28,
    fontFamily: "Poppins-Medium",
    color: "#EDEDED",
    alignSelf: "center",
    width: "80%",
  },
  textinput: {
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: "80%",
    height: 61,
    alignSelf: "center",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    marginBottom: 24,
  },
  textPassword: {
    marginBottom: 16,
  },
  forgetPass: {
    color: "#fff",
    alignSelf: "center",
    width: "80%",
    margin: 0,
  },
});



