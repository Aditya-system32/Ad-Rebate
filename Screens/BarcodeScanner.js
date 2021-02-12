import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function BarcodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

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
    <View style={styles.container}>
      <Text style={styles.text}>Scan code</Text>
      <View style={styles.viewww}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, styles.scanner]}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewww: {
    width: "100%",
    height: "80%",
    backgroundColor: "white",
  },
  text: {
    color: "white",
  },
  scanner: {
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
    flexDirection: "column",
    justifyContent: "center",
  },
});
