import React, { useState, useRef } from "react";
import {View, Text, TouchableOpacity, Animated} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Feather";
import EditIcon from "react-native-vector-icons/AntDesign";
import PlusIcon from "react-native-vector-icons/AntDesign";
import XIcon from "react-native-vector-icons/Feather";
import CartIcon from "react-native-vector-icons/AntDesign"
import {CardSection} from "./common";
// import { Actions } from "react-native-router-flux";

const IndividualItem = (props) => {

    const {itemName, amount, amountType, price} = props.item;
    const [expanded, setExpanded] = useState(false);

    function onDelete(){
        const {currentUser} = auth();

        firestore()
            .collection(`users/${currentUser.uid}/shops/${props.shopUid}/items`)
            .doc(props.itemUid)
            .delete()
    }

    function onAdd(){
        const {currentUser} = auth();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var date = String(new Date().getDate()).padStart(2, '0');
        var month = monthNames[new Date().getMonth()];
        var year = new Date().getFullYear();
        var day = dayNames[new Date().getDay()];
        const fullDate = day + " " +  month + " " + date + " " + year;

        firestore()
            .collection(`users/${currentUser.uid}/shops/${props.shopUid}/history`)
            .add({
                itemName, amount, amountType, price, shop: props.shopName, date: fullDate
            })

        firestore()
            .collection(`users/${currentUser.uid}/shops/${props.shopUid}/items`)
            .doc(props.itemUid)
            .delete()

            setExpanded(false);
    }

    const FadeInView = (props) => {
        const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
      
        React.useEffect(() => {
          Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }
          ).start();
        }, [fadeAnim])
      
        return (
          <Animated.View                 // Special animatable View
            style={{
              ...props.style,
              opacity: fadeAnim,         // Bind opacity to animated value
            }}
          >
            {props.children}
          </Animated.View>
        );
      }

    function renderIcon(){
        if(expanded===true){
            return(
                <FadeInView style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => props.navigation.navigate('editItem', {shopUid: props.shopUid, shopName: props.shopName, itemName, amount, amountType, price, itemUid: props.itemUid})}>
                        <EditIcon name="edit" size={25} style={{color: '#fff'}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onDelete()}>
                        <Icon style={styles.iconStyle} name="trash-2" size={25} />
                    </TouchableOpacity>
                    </FadeInView>
            )
        }
    }


    return(
        <View>
            <CardSection style={styles.cardStyle}>
                <View style={{flexDirection: 'row', flex :1}}>
                    <Text style={{fontSize: 18, paddingLeft: 5, color: '#fff'}}>{props.item.itemName}</Text>
                    {expanded===false
                        ?
                            <Text style={styles.textStyle}>- Rs{props.item.price} ({amount}{amountType !== 'number' && amountType})</Text>
                        
                        :null
                    }
                </View>
                {renderIcon()}
                {expanded===true
                    ?<XIcon name="x" style={[styles.iconStyle, {paddingRight: 10, color: '#fff'}]} size={25} onPress={() => setExpanded(false)} />
                    :<PlusIcon name="plus" style={[styles.iconStyle, {paddingRight: 10, color: '#fff'}]} size={25} onPress={() => setExpanded(true)} />
                }
                <TouchableOpacity onPress={() => onAdd()}>
                    <CartIcon style={[styles.iconStyle, {paddingRight: 15, paddingLeft: 0}]} name="shoppingcart" size={25} />
                </TouchableOpacity>
            </CardSection>
        </View>
    )
}

const styles={
    cardStyle: {
        borderWidth: 0,
        marginBottom: 20,
        paddingVertical: 13,
        marginHorizontal: 20,
        backgroundColor: '#333333',
        paddingLeft: 10
    },
    textStyle: {
        fontSize: 18,
        paddingLeft: 5,
        flex: 1,
        color: '#fff'
    },
    iconStyle: {
        paddingRight: 0,
        paddingLeft: 15,
        color: '#fff'
    },
}

export default IndividualItem;