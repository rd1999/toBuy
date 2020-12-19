import _ from "lodash";
import React, { useEffect, useState } from "react";
import {View, Text, TouchableWithoutFeedback, TextInput} from "react-native";
import AddIcon from "react-native-vector-icons/AntDesign";
import PersonIcon from "react-native-vector-icons/Ionicons";
// import { Actions } from "react-native-router-flux";
import auth from "@react-native-firebase/auth";
import SearchIcon from "react-native-vector-icons/Feather";
import firestore from "@react-native-firebase/firestore";
import IndividualShop from "./IndividualShop";
import {CardSection} from "./common"
import { ScrollView } from "react-native-gesture-handler";

const Shops = ({navigation}) => {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {

        const {currentUser} = auth();

        firestore()
            .collection(`users/${currentUser.uid}/shops`)
            .onSnapshot(docs => {
                let users = []
                docs.forEach(doc => {
                    users.push({data: doc.data(), uid: doc.id})
                })
                setData(users)
                setFilteredData(users);
            })

    }, [])

    const searchItem = (text) => {
        setFilteredData(data.filter((el) => el.data.name.toLowerCase().includes(text.toLowerCase())))
    }

    return(
            <ScrollView style={{flex: 10, backgroundColor: '#121212'}} contentContainerStyle={{flex: 1}}>
                {/* <PersonIcon name="person" color="#fff" size={25} style={{alignSelf: 'flex-end', marginTop: 30, marginRight: 25}} />   */}
                <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 20}}>

                    <Text style={styles.headerStyle}>Shops</Text>
                    <CardSection style={styles.searchBarStyle}>
                        <SearchIcon onPress={() => setExpanded(false)} name="search" size={25} style={{alignSelf: 'center', paddingRight: 5, color: '#fff'}} />   
                            <TextInput 
                                style={{fontSize: 18, flex: 1, color: '#fff'}} 
                                placeholder="Search for shops" 
                                onChangeText={(text) => searchItem(text)} 
                                placeholderTextColor='#fff'
                            />
                    </CardSection>  
                                   
                </View>   

                {data.length === 0 && <Text style={{alignSelf: 'center', fontSize: 18, color: '#ddd'}}>Create your first shop</Text>}

                <ScrollView style={{flex: 9.7}}>

                    {filteredData.map((shop, index) => <View key={index}>
                        <IndividualShop shop={shop} navigation={navigation} />
                    </View>)}

                </ScrollView>

                <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 0.3}}>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('createShop')}>

                        <AddIcon name="pluscircle" size={60} color="#b030b0" style={styles.addIconStyle} />

                    </TouchableWithoutFeedback>

                </View>

            </ScrollView>
        )
}

const styles = {
    iconStyle: {
        alignSelf: 'center'
    },
    addIconStyle: {
        paddingRight: 40,
        paddingBottom: 40
    },
    searchBarStyle: {
        borderWidth: 1,
        borderColor: '#b030b0',
        marginHorizontal: 25,
        marginTop: 25,
        paddingVertical: -5,
        height: 50,
        flex: 1,
        borderRadius: 15,
        color: '#fff',
        paddingLeft: 10
    },
    headerStyle: {
        fontSize: 30, 
        fontWeight: 'bold', 
        marginLeft: 25, 
        marginVertical: 30, 
        marginRight: 10, 
        color: '#fff'
    }
}

export default Shops;