import React, { useEffect } from "react";
import {View, Text} from "react-native";
import auth from "@react-native-firebase/auth";

const DefaultPage = () => {

    useEffect(() => {
        auth().signInAnonymously().catch(function(error){
            alert(error.code);
            alert(error.message);
        })
    }, [])

    return(
        <View>
            <View style={styles.circle1}></View>
            <Text style={styles.textStyle}>ToBuy</Text>
            <Text style={styles.textStyle}>App</Text>
            <View style={styles.circle2}></View>
        </View>
    )
}

const styles = {
    circle1: {
        borderRadius: 200, 
        height: 400, 
        width: 400, 
        backgroundColor: '#d2e603', 
        marginLeft: -200,
        marginTop: -100
    },
    circle2: {
        borderRadius: 200, 
        height: 400, 
        width: 400, 
        backgroundColor: '#d2e603',
        marginTop: 70,
        marginRight: -200,
        alignSelf: 'flex-end'
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 40,
        fontWeight: 'bold'
    }
}

export default DefaultPage;
