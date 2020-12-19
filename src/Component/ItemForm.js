import React, {useState} from "react";
import {TextInput, View, Text, ScrollView} from "react-native";
import {Picker} from "@react-native-community/picker";
import { CardSection, Button, Header } from "./common";

const ItemForm = ({onButtonPress, initItem, initAmt, initPrice, initAmtType}) => {

    const {headerStyle, cardStyle, textInputStyle, buttonStyle} = styles;
    const [item, setItem] = useState(initItem);
    const [price, setPrice] = useState(initPrice);
    const [amount, setAmount] = useState(initAmt);
    const [amountType, setAmountType] = useState(initAmtType);

    return(
        <ScrollView style={{flex: 10, backgroundColor: '#121212'}}>
            <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 20}}>
                <Text style={{fontSize: 30, fontWeight: 'bold', marginLeft: 25, marginVertical: 30, color: '#fff'}}>Create</Text>
            </View>
            <CardSection style={cardStyle}>
                <TextInput style={textInputStyle} placeholder="Name of the item" 
                    onChangeText={text => setItem(text)}
                    value={item}
                    placeholderTextColor='#fff'
                />
            </CardSection>
            <CardSection style={cardStyle}>
                <TextInput style={textInputStyle} placeholder="Price of the item" 
                    onChangeText={text => setPrice(text)}
                    value={price}
                    keyboardType={'numeric'}
                    placeholderTextColor='#fff'
                />
            </CardSection>
            <CardSection style={cardStyle}>
                <TextInput style={textInputStyle} placeholder="Amount" 
                    onChangeText={text => setAmount(text)}
                    value={amount}
                    keyboardType={'numeric'}
                    placeholderTextColor='#fff'
                />
            </CardSection>
            <CardSection style={cardStyle}>
                <Picker
                    style={{flex: 1, marginLeft: 10, color: '#fff'}}
                    selectedValue={amountType}
                    onValueChange={type => setAmountType(type)}
                >
                    <Picker.Item label="kg" value="kg" />
                    <Picker.Item label="gm" value="gm" />
                    <Picker.Item label="number" value="number" />
                </Picker>
            </CardSection>
            <CardSection style={buttonStyle}>
                <Button onPress={() => onButtonPress(item, price, amount, amountType)}>
                    Create
                </Button>
            </CardSection>
        </ScrollView>
    )
}

const styles = {
    cardStyle: {
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 30,
        marginBottom: 20,
        borderColor: '#b030b0'
    },
    textInputStyle: {
        fontSize: 18,
        flex: 1,
        color: '#fff'
    },
    buttonStyle: {
        borderBottomWidth: 0,
        marginHorizontal: 30,
        marginTop: 30,

    }
}

export default ItemForm;