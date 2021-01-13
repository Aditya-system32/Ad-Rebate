import React from 'react';
import { StyleSheet ,View ,Text} from 'react-native';

export default function Login(){
    return(
        <View style = {styles.container}>
            <Text style = {styles.titleText}>Login Text</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:24
    },
    titleText:{
        fontFamily:'poppins-medium',
        fontSize:26,
        fontWeight:"600",
    }
})