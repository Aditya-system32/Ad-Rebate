import "react-native-gesture-handler";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  BackHandler,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
  ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalstyles } from "../styles/global";
import { db } from "../firebases";
import { AuthContext } from "../routes/AuthProvider";

export default function ProfileScreen({ navigation }) {
  const [location, setLocation] = useState("bhilai");
  const [fullName, setFullName] = useState();
  const { user } = useContext(AuthContext);
  const [locationOptions, setLocationOptions] = useState([
    { value: "bhilai", label: "Bhilai", key: "Bhilai" },
  ]);
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  const update = () => {
    if (fullName != undefined) {
      db.collection("Users")
        .doc(user.uid)
        .set(
          {
            username: fullName,
            location: location,
          },
          { merge: true }
        )
        .then(
          () => navigation.pop(),
          ToastAndroid.show("Profile Updated", ToastAndroid.SHORT)
        )
        .catch(function (err) {
          console.log("Error getting Updated:", err);
        });
    } else {
      db.collection("Users")
        .doc(user.uid)
        .set(
          {
            location: location,
          },
          { merge: true }
        )
        .then(
          () => navigation.pop(),
          ToastAndroid.show("Profile Updated", ToastAndroid.SHORT)
        )
        .catch(function (err) {
          console.log("Error getting Updated:", err);
        });
    }
  };

  return (
    <View style={globalstyles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.welcomeBackWrapper}>
        <Text style={styles.welcomeBack}>Update profile</Text>
      </View>
      <ScrollView>
        <View>
          <TextInput
            style={styles.textinput}
            placeholder="Full Name"
            placeholderTextColor="#EDEDED"
            color="#fff"
            onChangeText={(text) => setFullName(text)}
          ></TextInput>
        </View>
        <View style={styles.picker}>
          <Picker
            style={{ width: "100%", height: 61, color: "#fff" }}
            selectedValue={location}
            onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
          >
            {locationOptions.map((item) => {
              return (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={item.key}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.ProfileCompleteWrapper}>
          <TouchableNativeFeedback useForeground={true} onPress={update}>
            <View style={styles.ProfileCompleteButton}>
              <Text style={styles.ProfileCompleteButtonTitle}>Update</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ProfileCompleteWrapper: {
    marginTop: 10,
  },
  ProfileCompleteButton: {
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
  ProfileCompleteButtonTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  picker: {
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    color: "#ffffff",
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
  welcomeBackWrapper: {
    marginBottom: 30,
    marginTop: 20,
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
});
