import React from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {Text, TouchableOpacity} from "react-native";
import { Button, CardSection } from "./common";

const HistoryItem = (props) => {

    const {itemName, date, amount, amountType, shop, price} = props.item;
    console.log(itemName);

    function onAdd() {
        const {currentUser} = auth();

        firestore()
            .collection(`users/${currentUser.uid}/shops/${props.shopUid}/items`)
            .add({
                itemName,
                price,
                amount, 
                amountType
            })
    }

    return(
            <TouchableOpacity onPress={() => onAdd()}>
            <CardSection style={styles.cardStyle}>
                <Text style={styles.textStyle}>item - {itemName}</Text>
                <Text style={styles.textStyle}>date - {date}</Text>
                <Text style={styles.textStyle}>price - Rs. {price}({amount}{ amountType !== "number" && amountType})</Text>
            </CardSection>
            </TouchableOpacity>
    )
}

const styles = {
    cardStyle: {
        flexDirection: 'column', 
        borderWidth: 0, 
        borderRadius: 0,
        marginHorizontal: 20,
        marginVertical: 30,
        borderRadius: 18,
        backgroundColor: '#333333',
        paddingHorizontal: 20
    },
    textStyle: {
        fontSize: 18,
        paddingVertical: 5,
        color: '#fff'
    }
}

export default HistoryItem;