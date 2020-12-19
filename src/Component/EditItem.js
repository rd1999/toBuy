import React from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
// import {Actions} from "react-native-router-flux";
import { ScrollView } from "react-native-gesture-handler";
import ItemForm from "./ItemForm";

const CreateItem = ({route, navigation}) => {

    const {itemName, price, amount, amountType, shopUid, shopName, itemUid} = route.params;

    const onButtonPress = (item, price, amount, amountType) => {
        const {currentUser} = auth();

        firestore()
            .collection(`users/${currentUser.uid}/shops/${shopUid}/items`)
            .doc(itemUid)
            .update({
                itemName: item, 
                price, 
                amount, 
                amountType
            })

        // Actions.items({shopUid: shopUid, shopName: shopName});
        navigation.goBack();

    }
    
    return(
        <ScrollView style={{flex: 1}} contentContainerStyle={{flex: 1}}>
            <ItemForm
                onButtonPress={(item, price, amount, amountType) => onButtonPress(item, price, amount, amountType)} 
                initItem = {itemName}
                initPrice = {price}
                initAmt = {amount}
                initAmtType = {amountType}
            />
        </ScrollView>
    )
}

export default CreateItem;