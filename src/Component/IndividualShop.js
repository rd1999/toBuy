import React, { useState, useRef } from "react";
import {View, Text, TouchableWithoutFeedback, Animated} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import EditIcon from "react-native-vector-icons/AntDesign";
import PlusIcon from "react-native-vector-icons/AntDesign";
import XIcon from "react-native-vector-icons/Feather";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
// import {Actions} from "react-native-router-flux";
import {CardSection} from "./common";
import { TextInput } from "react-native-gesture-handler";

const IndividualShop = ({shop, navigation}) => {

    const {name} = shop.data;
    const {uid} = shop;
    const [isEdit, setIsEdit] = useState(false);
    const [editItem, setEditItem] = useState(shop.data.name);
    const [expanded, setExpanded] = useState(false);

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
    
    function onDelete(){

        const {currentUser} = auth();

        firestore()
            .collection(`users/${currentUser.uid}/shops`)
            .doc(uid)
            .delete();

        setExpanded(false);

    }

    function onEdit(){

        setIsEdit(true);
    }

    function onCheck(){

        const {currentUser} = auth();

        firestore()
            .collection(`users/${currentUser.uid}/shops`)
            .doc(uid)
            .update({
                name: editItem
            })

        setIsEdit(false);
        setEditItem(name);

    }

    function renderText(){
        if(isEdit === false){
            return(
                <TouchableWithoutFeedback onPress={() => navigation.navigate('itemList', {shopName: name, shopUid: uid})}>
                    <Text style={styles.textStyle}>{name}</Text>
                </TouchableWithoutFeedback>
            )
        }else{
            return(
                <TextInput 
                    style={styles.textInputStyle} 
                    value={editItem} 
                    onChangeText={(text) => setEditItem(text)}
                />
            )
        }
    }

    function renderIcon(){
        if(expanded===true){
            if(isEdit === false){
                return(
                    <FadeInView>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableWithoutFeedback onPress={() => onEdit()}>
                                <EditIcon name="edit" size={25} style={styles.iconStyle} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => onDelete()}>
                                <Icon style={styles.iconStyle} name="trash-2" size={25} />
                            </TouchableWithoutFeedback>
                        </View>
                    </FadeInView>
                )
            }
    
            return(
                <View style={{flexDirection: 'row'}}>
                    <TouchableWithoutFeedback onPress={() => onCheck()}>
                        <EditIcon name="check" size={25} style={styles.iconStyle} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => onDelete()}>
                        <Icon style={styles.iconStyle} name="trash-2" size={25} />
                    </TouchableWithoutFeedback>
                </View>
            )
        }
        
    }

    return(
        <View>
            <CardSection style={styles.cardStyle}>
                {renderText()}
                {renderIcon()}
                {expanded===true
                    ?<XIcon name="x" style={styles.iconStyle} size={25} onPress={() => setExpanded(false)} />
                    :<PlusIcon name="plus" style={[styles.iconStyle]} size={25} onPress={() => setExpanded(true)} />}
                
                
            </CardSection>
        </View>
    )
    
}

const styles = {
    cardStyle: {
        borderWidth: 0,
        borderBottomWidth: 0,
        borderColor: '#fff',
        backgroundColor: '#333333',
        marginBottom: 20,
        paddingVertical: 13,
        marginHorizontal: 20,
        borderRadius: 15
    },
    textStyle: {
        fontSize: 18,
        flex: 1,
        paddingLeft: 10,
        color: '#fff'
    },
    iconStyle: {
        paddingRight: 5,
        paddingLeft: 15,
        color: '#fff'
    },
    textInputStyle: {
        flex: 1,
        fontSize: 18,
        paddingVertical: -5,
        color: '#fff'
    }
}

export default IndividualShop;