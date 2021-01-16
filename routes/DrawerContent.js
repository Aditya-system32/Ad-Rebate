import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import {View,StyleSheet,TouchableNativeFeedback} from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
}from 'react-native-paper';
import{
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer'
import {globalstyles} from '../styles/global'

export function DrawerContent(props){
    return(
        <View style={globalstyles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={{alignItems:"flex-end",marginRight:15}}>
                        <AntDesign name="close" size={24} color="white"  onPress={()=>props.navigation.closeDrawer()}/>
                    </View>
                    <View style={styles.userInfoSection}>
                        <View style={styles.profileWrapper}>
                            <Avatar.Image 
                                source={{
                                    uri:'https://www.iconsdb.com/icons/preview/white/circle-xxl.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:20}}>
                                <Title style = {styles.title}>User_Name </Title>
                                <Caption style = {styles.caption}>@1015246</Caption>
                            </View>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <Text style = {styles.drawerSectionTitle}>Home</Text>
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection}>
                    <Text style = {styles.drawerSectionTitle}>COUPONS</Text>
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection}>
                    <Text style = {styles.drawerSectionTitle}>ABOUT US</Text>
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection}>
                    <Text style = {styles.drawerSectionTitle}>LOG OUT</Text>
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerWrapper}>
                <Text style={styles.bottomDrawer}>version v0.1</Text>
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        borderColor:"#525252",
    },
    
    drawerContent: {
        flex: 1,
      },
      userInfoSection: {
        paddingLeft: 25,
      },
      title: {
        fontSize: 16,
        marginTop: 3,
        color:"#EDEDED"
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        color:"#EDEDED"
      },
      drawerSection: {
        marginTop:-6,
        justifyContent:"center",
        alignItems:"center",
        borderColor:"#272727",
        borderWidth:1,
        height:58
      },
      drawerSectionTitle:{
        color:"#EDEDED",
        fontSize:14
      },
      profileWrapper:{
          marginTop:50,
          marginBottom:21,
          flexDirection:"row",
      },
      bottomDrawerWrapper:{
        alignItems:"center",
        marginBottom:20
    },
    bottomDrawer:{
        fontSize:12,
        color:"#808080",
    },
})

