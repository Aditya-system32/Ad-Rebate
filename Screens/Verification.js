import "react-native-gesture-handler";
import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  TouchableNativeFeedback,
  BackHandler,
} from "react-native";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import { firebaseConfig } from "../firebases";
import { scaledSize } from "./Home";
import { set } from "react-native-reanimated";

export default function VerificationScreen({ route, navigation }) {
  const recaptchaVerifier = useRef(null);
  const verificationCodeTextInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState(route.params.paramKey);
  const [verificationId, setVerificationId] = useState("");
  const [verifyError, setVerifyError] = useState();
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmError, setConfirmError] = useState();
  const [confirmInProgress, setConfirmInProgress] = useState(false);
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
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <View style={styles.content}>
          <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
            attemptInvisibleVerification={true}
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
            title="Prove you are hooman!"
          />
          <Text style={styles.title}>Verify Mobile Number</Text>
          <TextInput
            style={styles.textInput}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            editable={!verificationId}
            value={route.params.paramKey}
          />
          <TouchableNativeFeedback
            onPress={async () => {
              const phoneProvider = new firebase.auth.PhoneAuthProvider();
              try {
                setVerifyError(undefined);
                setVerifyInProgress(true);
                setVerificationId("");
                const verificationId = await phoneProvider.verifyPhoneNumber(
                  phoneNumber,
                  recaptchaVerifier.current
                );
                setVerifyInProgress(false);
                setVerificationId(verificationId);
                verificationCodeTextInput.current?.focus();
              } catch (err) {
                setVerifyError(err);
                setVerifyInProgress(false);
              }
            }}
          >
            <View style={styles.sendButton}>
              <Text style={styles.sendButtonText}>{`${
                verificationId ? "Resend" : "Send"
              } Verification Code`}</Text>
            </View>
          </TouchableNativeFeedback>
          {verifyError && (
            <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>
          )}
          {verifyInProgress && <ActivityIndicator style={styles.loader} />}
          {verificationId ? (
            <Text style={styles.success}>verification code sent.</Text>
          ) : undefined}
          <TextInput
            ref={verificationCodeTextInput}
            style={styles.textInput}
            editable={!!verificationId}
            keyboardType="phone-pad"
            placeholder="Enter verification code"
            placeholderTextColor="#EDEDED"
            onChangeText={(verificationCode) =>
              setVerificationCode(verificationCode)
            }
          />
          <TouchableNativeFeedback
            onPress={async () => {
              try {
                setConfirmError(undefined);
                setConfirmInProgress(true);
                const credential = firebase.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );
                const authResult = await firebase
                  .auth()
                  .signInWithCredential(credential);

                verificationCodeTextInput.current?.clear();
              } catch (err) {
                setConfirmError(err);
                setConfirmInProgress(false);
              }
            }}
          >
            <View style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>
                Confirm Verification Code
              </Text>
            </View>
          </TouchableNativeFeedback>
          {confirmError && (
            <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>
          )}
          {confirmInProgress && <ActivityIndicator style={styles.loader} />}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaledSize(20),
    backgroundColor: "black",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    borderRadius: scaledSize(20),
    height: scaledSize(58),
    backgroundColor: "#ffffff",
    borderColor: "#8d8d8d",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: scaledSize(24),
  },
  sendButtonText: {
    color: "#000000",
    fontSize: scaledSize(16),
    fontFamily: "Poppins-Medium",
  },
  confirmButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    borderRadius: scaledSize(20),
    height: scaledSize(58),
    backgroundColor: "#000000",
    borderColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 24,
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: scaledSize(16),
    fontFamily: "Poppins-Medium",
  },
  content: {
    marginTop: scaledSize(50),
  },
  title: {
    marginBottom: scaledSize(50),
    fontSize: scaledSize(29),
    fontWeight: "bold",
    color: "white",
    fontFamily: "Poppins-Regular",
  },
  subtitle: {
    marginBottom: scaledSize(10),
    opacity: 0.35,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Poppins-Regular",
  },
  text: {
    marginTop: scaledSize(30),
    marginBottom: scaledSize(4),
    color: "#EDEDED",
    fontSize: scaledSize(18),
    fontFamily: "Poppins-Medium",
  },
  textInput: {
    backgroundColor: "#1A1A1A",
    borderColor: "#424242",
    borderWidth: 1,
    color: "#EDEDED",
    fontSize: scaledSize(18),
    borderRadius: scaledSize(20),
    paddingLeft: scaledSize(20),
    paddingRight: scaledSize(20),
    width: "80%",
    height: scaledSize(61),
    alignSelf: "center",
    justifyContent: "center",
    fontSize: scaledSize(18),
    fontFamily: "Poppins-Regular",
    marginBottom: scaledSize(24),
  },
  error: {
    marginTop: 0,
    marginBottom: scaledSize(24),
    color: "#ff6666",
    fontSize: scaledSize(14),
    fontFamily: "Poppins-Medium",
    alignSelf: "center",
  },
  success: {
    marginTop: 0,
    marginBottom: scaledSize(24),
    color: "#3edb65",
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(14),
    alignSelf: "center",
  },
  loader: {
    marginTop: scaledSize(10),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFFC0",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontWeight: "bold",
  },
});
