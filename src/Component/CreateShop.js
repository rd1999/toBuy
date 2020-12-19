import React, { useState } from "react";
import {Text,View, TextInput} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
// import {Actions} from "react-native-router-flux";
import { CardSection, Button, Header } from "./common";

const CreateShop = ({navigation}) => {

    const {cardStyle, textInputStyle, buttonStyle} = styles;
    const [shop, setShop] = useState('');

    const onButtonPress = () => {

        const {currentUser} = auth();
    
        firestore().
            collection(`users/${currentUser.uid}/shops`)
            .add({
                name: shop
            })
        
        // Actions.mainFlow({type: 'reset'});
        navigation.goBack();

    }
    
    return(
        <View style={{backgroundColor: '#121212', flex:1}}>
            <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 20}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', marginLeft: 25, marginVertical: 30, color: '#fff'}}>Create</Text>
            </View>
            <CardSection style={cardStyle}>
                <TextInput style={textInputStyle} 
                    placeholder="Name of the shop" 
                    onChangeText={text => setShop(text)}
                    value={shop}
                    placeholderTextColor='#fff'
                />
            </CardSection>
            <CardSection style={buttonStyle}>
                <Button onPress={() => onButtonPress()}>
                    Add
                </Button>
            </CardSection>
        </View>
    )
}

const styles = {
    cardStyle: {
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 30,
        marginBottom: 50,
        borderColor: '#b030b0'
    },
    textInputStyle: {
        fontSize: 18,
        flex: 1,
        color: '#fff'
    },
    buttonStyle: {
        borderBottomWidth: 0,
        marginHorizontal: 30
    }
}

export default CreateShop;