import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scaledSize } from "./Home";
import axios from "axios";
const Menu = ({ navigation, route }) => {
  const { clientid, category, name } = route.params;
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      title: name + " Menu",
    });
  });
  useEffect(() => {
    if (!clientid) {
      return;
    } else {
      load();
    }
    async function load() {
      setloading(true);
      let response;
      try {
        response = await axios.get(
          `https://adrebaterestroserver.herokuapp.com/api/menu?client=${clientid}`
        );
      } catch (err) {
        console.log("err");
      }
      //   let response = await axios.get(
      //     " https://adrebaterestroserver.herokuapp.com/api/menu?client=Avalon"
      //   );
      if (response.data) {
        setdata(response.data);
      }
      setloading(false);
    }
  }, [clientid]);
  return (
    <View style={styles.page}>
      {loading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          color="white"
          size="small"
        ></ActivityIndicator>
      ) : null}

      {data ? (
        <ScrollView>
          {Object.keys(data).map((item) => {
            if (item === "noOfSections") return null;
            let section = data[item];
            return (
              <View style={styles.SectionHolder} key={section.id}>
                <Text style={styles.text}>{section.name}</Text>
                {section.items.map((menuitem) => {
                  return (
                    <View style={[styles.menuitem]} key={menuitem.id}>
                      <Image
                        style={styles.image}
                        source={{ uri: menuitem.image }}
                      ></Image>
                      <View style={styles.nameandtext}>
                        <Text style={styles.nametext}>{menuitem.name}</Text>
                        <View
                          style={[
                            styles.type,
                            ,
                            menuitem.type === "veg"
                              ? styles.veg
                              : menuitem.type === "non"
                              ? styles.nonveg
                              : styles.egg,
                          ]}
                        >
                          <View
                            style={[
                              styles.type2,
                              ,
                              menuitem.type === "veg"
                                ? styles.vegr
                                : menuitem.type === "non"
                                ? styles.nonvegr
                                : styles.eggr,
                            ]}
                          ></View>
                        </View>
                      </View>

                      <Text style={styles.pricetext}>
                        {"₹ " + menuitem.price}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      ) : !loading ? (
        <Text
          style={[
            styles.text,
            {
              alignSelf: "center",
              marginTop: scaledSize(320),
              fontSize: scaledSize(12),
              color: "#ff8585",
              fontFamily: "Poppins-Regular",
            },
          ]}
        >
          Oops, menu not found try again later.
        </Text>
      ) : null}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  nameandtext: {
    marginLeft: scaledSize(20),
    height: "100%",
    paddingVertical: scaledSize(18),
  },
  type: {
    borderWidth: 1,
    borderColor: "#fff",
    width: scaledSize(12),
    height: scaledSize(12),
    marginTop: scaledSize(5),
    alignItems: "center",
    justifyContent: "center",
  },
  type2: {
    width: scaledSize(4),
    height: scaledSize(4),
    borderRadius: 50,
  },
  SectionHolder: {
    marginTop: scaledSize(30),
  },
  veg: { borderColor: "#00923E" },
  nonveg: { borderColor: "rgb(146, 40, 42)" },
  egg: { borderColor: "rgb(223, 204, 0)" },
  vegr: {
    borderColor: "#00923E",
    backgroundColor: "#00923E",
  },
  nonvegr: {
    borderColor: "rgb(146, 40, 42)",
    backgroundColor: "rgb(146, 40, 42)",
  },
  eggr: {
    borderColor: "rgb(223, 204, 0)",
    backgroundColor: "rgb(223, 204, 0)",
  },
  menuitem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scaledSize(7),
    borderRadius: 20,
    height: scaledSize(80),
    backgroundColor: "rgba(50,50,50,0.2)",
    borderRadius: scaledSize(30),
    borderColor: "#2e2e2e",
    borderWidth: 0.5,
    overflow: "hidden",
    marginVertical: scaledSize(7),
  },
  image: {
    width: scaledSize(60),
    height: scaledSize(60),
    borderRadius: scaledSize(20),
    marginLeft: scaledSize(20),
    borderWidth: 1,
    borderColor: "#2e2e2e",
  },
  activityIndicator: {
    alignSelf: "center",
    marginTop: scaledSize(320),
  },
  page: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontFamily: "Poppins-Medium",
    fontSize: scaledSize(14),
    marginLeft: scaledSize(20),
  },
  nametext: {
    color: "white",
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(13),
  },
  pricetext: {
    color: "#ffffff",
    fontFamily: "Poppins-Regular",
    fontSize: scaledSize(13),
    marginLeft: scaledSize(20),
    position: "absolute",
    right: scaledSize(40),
  },
});
