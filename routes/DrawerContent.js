import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, TouchableNativeFeedback, Image } from "react-native";
import { Title, Drawer, Text } from "react-native-paper";
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
          <View style={{ alignItems: "flex-end", marginRight: scaledSize(15) }}>
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

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            label="HOME"
            labelStyle={{
              color: "#EDEDED",
              fontSize: scaledSize(14),
              alignSelf: "center",
              fontFamily: "Poppins-Medium",
              textAlignVertical: "center",
            }}
            onPress={() => {
              props.navigation.navigate("Home");
            }}
            style={styles.labelStyle}
          />
        </Drawer.Section>

        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="COUPONS"
              labelStyle={{
                color: "#EDEDED",
                fontSize: scaledSize(14),
                alignSelf: "center",
                fontFamily: "Poppins-Medium",
              }}
              style={styles.labelStyle}
              onPress={() => {
                props.navigation.navigate("Coupon");
              }}
            />
          </Drawer.Section>
        )}

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            label="ESSENTIALS"
            labelStyle={{
              color: "#EDEDED",
              fontSize: scaledSize(14),
              alignSelf: "center",
              paddingLeft: scaledSize(6),
              fontFamily: "Poppins-Medium",
            }}
            style={styles.labelStyle}
            onPress={() => {
              props.navigation.navigate("Essentials");
            }}
          />
        </Drawer.Section>

        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="SHARE COUPON"
              labelStyle={{
                color: "#EDEDED",
                fontSize: scaledSize(14),
                alignSelf: "center",
                paddingLeft: scaledSize(6),
                fontFamily: "Poppins-Medium",
              }}
              style={styles.labelStyle}
              onPress={() => {
                props.navigation.navigate("ShareCoupons");
              }}
            />
          </Drawer.Section>
        )}
        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="REGISTER WITH US"
              labelStyle={{
                color: "#EDEDED",
                fontSize: scaledSize(14),
                alignSelf: "center",
                paddingLeft: scaledSize(6),
                fontFamily: "Poppins-Medium",
              }}
              style={styles.labelStyle}
              onPress={() => {
                props.navigation.navigate("RegisterWithUs");
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
                fontSize: scaledSize(14),
                alignSelf: "center",
                paddingLeft: scaledSize(6),
                fontFamily: "Poppins-Medium",
              }}
              onPress={() => {
                props.navigation.navigate("Invite and earn");
              }}
              style={styles.labelStyle}
            />
          </Drawer.Section>
        )}
        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="SCANNER"
              labelStyle={{
                color: "#EDEDED",
                fontSize: scaledSize(14),
                alignSelf: "center",
                paddingLeft: scaledSize(6),
                fontFamily: "Poppins-Medium",
              }}
              style={styles.labelStyle}
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
                fontSize: scaledSize(14),
                alignSelf: "center",
                paddingLeft: scaledSize(6),
                fontFamily: "Poppins-Medium",
              }}
              style={styles.labelStyle}
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
              fontSize: scaledSize(14),
              alignSelf: "center",
              fontFamily: "Poppins-Medium",
            }}
            style={styles.labelStyle}
            onPress={() => {
              props.navigation.navigate("Help");
            }}
          />
        </Drawer.Section>
        {!user ? null : (
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="LOG OUT"
              labelStyle={{
                color: "#EDEDED",
                fontSize: scaledSize(14),
                alignSelf: "center",
                fontFamily: "Poppins-Medium",
              }}
              style={styles.labelStyle}
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
        <Text style={styles.bottomDrawer}>version v1.4</Text>
        <Text style={styles.bottomDrawer}>Made with ❤ in India</Text>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    height: scaledSize(58),
    color: "#EDEDED",
    fontSize: scaledSize(14),
    alignSelf: "center",
    width: "100%",
    fontFamily: "Poppins-Medium",
    justifyContent: "center",
    paddingBottom: scaledSize(5),
  },
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
    backgroundColor: "#0c0c0c",
  },
  userInfoSection: {
    padding: scaledSize(10),
    paddingLeft: scaledSize(25),
    flexDirection: "row",
    marginTop: scaledSize(10),
  },
  title: {
    fontSize: scaledSize(15),
    marginTop: scaledSize(3),
    fontFamily: "Poppins-Medium",
    marginLeft: scaledSize(10),
    color: "#EDEDED",
  },
  caption: {
    fontSize: scaledSize(14),
    lineHeight: scaledSize(14),
    color: "#EDEDED",
  },
  drawerSection: {
    marginTop: -scaledSize(6),
    alignContent: "center",
    marginRight: 0,
    height: scaledSize(58),
  },
  profileWrapper: {
    marginTop: scaledSize(10),
    marginBottom: scaledSize(10),
  },
  bottomDrawerWrapper: {
    alignItems: "center",
    marginBottom: scaledSize(20),
    width: "100%",
  },
  bottomDrawer: {
    fontSize: scaledSize(12),
    color: "#808080",
    textAlign: "center",
    paddingRight: scaledSize(20),
  },
  Edit: {
    color: "#EDEDED",
    backgroundColor: "#000000",
    fontSize: scaledSize(12),
    margin: scaledSize(10),
    width: scaledSize(60),
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    borderWidth: 1,
    borderColor: "#525252",
    borderRadius: scaledSize(3),
    paddingTop: scaledSize(4),
  },
});
