import React from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import ItemForm from "./ItemForm";

const CreateItem = ({route, navigation}) => {

    const {shopUid, shopName} = route.params;

    const onButtonPress = (item, price, amount, amountType) => {
        const {currentUser} = auth();

        firestore()
            .collection(`users/${currentUser.uid}/shops/${shopUid}/items`)
            .add({
                itemName: item,
                price,
                amount, 
                amountType
            })
        navigation.goBack();

    }
    
    return(
        <ScrollView style={{flex: 1, backgroundColor: '#121212'}}>
            <ItemForm
                onButtonPress={(item, price, amount, amountType) => onButtonPress(item, price, amount, amountType)} 
                initItem = ''
                iniPrice = ''
                initAmt = ''
                initAmtType = "kg"
            />
        </ScrollView>
    )
}

export default CreateItem;