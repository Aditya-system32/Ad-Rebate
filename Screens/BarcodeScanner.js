import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, BackHandler } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
export default function BarcodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
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
  //REQUEST FOR PERMISSION
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      navigation.navigate("Redeem", {
        paramKey: data,
      });
    } catch {
      alert(`Bar code with type ${type} has not been successfully scanned!`);
    }
  };

  //CHECKING THE PERMISSION
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.cont}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.scanner]}
      >
        <Text style={styles.title}>Scan Code</Text>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
        {scanned && (
          <TouchableNativeFeedback
            style={styles.button}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.text}>Scan again</Text>
          </TouchableNativeFeedback>
        )}
      </BarCodeScanner>
    </View>
  );
}

const opacity = "rgba(0, 0, 0, .7)";
const styles = StyleSheet.create({
  cont: { width: "100%", height: "100%", position: "relative" },
  title: {
    position: "absolute",
    color: "white",
    width: "100%",
    height: 30,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 20,
    marginTop: 120,
  },
  text: {
    color: "#cacaca",
    fontFamily: "Poppins-Regular",
  },
  button: {
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4b4b4b",
    width: 130,
    marginBottom: 20,
    height: 50,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "black",
  },
  scanner: {
    zIndex: 1,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  layerTop: {
    flex: 0.6,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 0.9,
    backgroundColor: opacity,
  },
});
