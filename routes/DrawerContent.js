import React, { useContext, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, TouchableNativeFeedback, Image } from "react-native";
import { Avatar, Title, Caption, Drawer, Text } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { globalstyles } from "../styles/global";
import { AuthContext } from "../routes/AuthProvider";
import maleAvatar from "../assets/images/boyAvatar.png";
import femaleAvatar from "../assets/images/girlAvatar.png";
import { scaledSize } from "../Screens/Home";
export function DrawerContent(props) {
  const { user, logout, userData } = useContext(AuthContext);

  return (
    <View style={globalstyles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={{ alignItems: "flex-end", marginRight: 15 }}>
            <AntDesign
              name="close"
              size={25}
              color="white"
              onPress={() => props.navigation.closeDrawer()}
            />
          </View>

          {!user ? null : (
            <View style={styles.userInfoSection}>
              <Image
                style={styles.image}
                source={
                  userData && userData.gender === "male"
                    ? maleAvatar
                    : femaleAvatar
                }
              ></Image>
              <View style={styles.profileWrapper}>
                {userData == undefined || userData.username == null ? (
                  <Title style={styles.title}>User_Name</Title>
                ) : (
                  <Title style={styles.title}>{userData.username}</Title>
                )}
                <TouchableNativeFeedback
                  onPress={() => props.navigation.navigate("Profile")}
                >
                  <Text style={styles.Edit}>Edit</Text>
                </TouchableNativeFeedback>
              </View>
            </View>
          )}
        </View>
        {!user ? (
          <Drawer.Section
            style={{
              marginTop: 80,
              justifyContent: "center",
              alignContent: "center",
              borderColor: "#1a1a1a",
              borderWidth: 1,
              height: 58,
            }}
          >
            <DrawerItem
              label="HOME"
              labelStyle={{
                color: "#EDEDED",
                fontSize: 14,
                alignSelf: "center",
                fontFamily: "Poppins-Medium",
              }}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
          </Drawer.Section>
        ) : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="HOME"
              labelStyle={{
                color: "#EDEDED",
                fontSize: 14,
                alignSelf: "center",
                fontFamily: "Poppins-Medium",
              }}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
          </Drawer.Section>
        )}
        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="COUPONS"
              labelStyle={{
                color: "#EDEDED",
                fontSize: 14,
                alignSelf: "center",
                paddingLeft: 6,
                fontFamily: "Poppins-Medium",
              }}
              onPress={() => {
                props.navigation.navigate("Coupon");
              }}
            />
          </Drawer.Section>
        )}
        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="SHARE COUPON"
              labelStyle={{
                color: "#EDEDED",
                fontSize: 14,
                alignSelf: "center",
                paddingLeft: 6,
                fontFamily: "Poppins-Medium",
              }}
              onPress={() => {
                props.navigation.navigate("ShareCoupons");
              }}
            />
          </Drawer.Section>
        )}
        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="INVITE AND EARN"
              labelStyle={{
                color: "#EDEDED",
                fontSize: 14,
                alignSelf: "center",
                paddingLeft: 6,
                fontFamily: "Poppins-Medium",
              }}
              onPress={() => {
                props.navigation.navigate("Invite and earn");
              }}
            />
          </Drawer.Section>
        )}
        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="SCANNER"
              labelStyle={{
                color: "#EDEDED",
                fontSize: 14,
                alignSelf: "center",
                paddingLeft: 6,
                fontFamily: "Poppins-Medium",
              }}
              onPress={() => {
                props.navigation.navigate("Barcode");
              }}
            />
          </Drawer.Section>
        )}
        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="TRANSACTIONS"
              labelStyle={{
                color: "#EDEDED",
                fontSize: 14,
                alignSelf: "center",
                paddingLeft: 6,
                fontFamily: "Poppins-Medium",
              }}
              onPress={() => {
                props.navigation.navigate("Transactions");
              }}
            />
          </Drawer.Section>
        )}
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            label="HELP"
            labelStyle={{
              color: "#EDEDED",
              fontSize: 14,
              alignSelf: "center",
              paddingLeft: 6,
              fontFamily: "Poppins-Medium",
            }}
            onPress={() => {
              props.navigation.navigate("Help");
            }}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            label="ABOUT US"
            labelStyle={{
              color: "#EDEDED",
              fontSize: 14,
              alignSelf: "center",
              paddingLeft: 6,
              fontFamily: "Poppins-Medium",
            }}
            onPress={() => {
              props.navigation.navigate("About");
            }}
          />
        </Drawer.Section>
        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="LOG OUT"
              labelStyle={{
                color: "#EDEDED",
                fontSize: 14,
                alignSelf: "center",
                paddingLeft: 6,
                fontFamily: "Poppins-Medium",
              }}
              onPress={() =>
                logout()
                  ? props.navigation.closeDrawer()
                  : console.log("not closed")
              }
            />
          </Drawer.Section>
        )}
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerWrapper}>
        <Text style={styles.bottomDrawer}>version v0.1</Text>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: scaledSize(60),
    height: scaledSize(60),
  },
  container: {
    borderColor: "#1f1f1f",
    backgroundColor: "white",
  },

  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    padding: scaledSize(10),
    paddingLeft: scaledSize(25),
    flexDirection: "row",
    marginTop: 10,
  },
  title: {
    fontSize: scaledSize(15),
    marginTop: 3,
    fontFamily: "Poppins-Medium",
    marginLeft: scaledSize(10),
    color: "#EDEDED",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: "#EDEDED",
  },
  drawerSection: {
    marginTop: -6,
    justifyContent: "flex-start",
    alignContent: "center",
    borderColor: "#111111",
    borderBottomWidth: 1,
    marginRight: 0,
    height: 58,
  },
  profileWrapper: {
    marginTop: scaledSize(10),
    marginBottom: scaledSize(10),
  },
  bottomDrawerWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  bottomDrawer: {
    fontSize: 12,
    color: "#808080",
  },
  Edit: {
    color: "#EDEDED",
    backgroundColor: "#000000",
    fontSize: scaledSize(12),
    margin: 10,
    width: 60,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    borderWidth: 1,
    borderColor: "#525252",
    borderRadius: 3,
    paddingTop: 4,
  },
});
