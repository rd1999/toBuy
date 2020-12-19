import _ from "lodash";
import React, { useEffect, useState } from "react";
import {View, TouchableWithoutFeedback, Text, TextInput} from "react-native";
// import {Actions} from "react-native-router-flux";
import AddIcon from "react-native-vector-icons/AntDesign";
import EditIcon from "react-native-vector-icons/AntDesign";
import SearchIcon from "react-native-vector-icons/Feather";
import BackIcon from "react-native-vector-icons/Feather";
import AnalyticsIcon from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import IndividualItem from "./IndividualItem";
import { CardSection } from "./common";
import HistoryItem from "./HistoryItem";
import {ScrollView} from "react-native-gesture-handler";

const Items = ({route, navigation}) => {

    const [data, setData] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [filteredData, setFilteredData] = useState(historyData);
    const [isEdit, setEdit] = useState(false);
    const [editData, setEditData] = useState('Current List');
    const {shopUid, shopName} = route.params;
    // const {state} = navigation;
    // const {shopUid, shopName} = state.params.session;

    useEffect(() => {

        const {currentUser} = auth();

        firestore()
            .collection(`users/${currentUser.uid}/shops/${shopUid}/items`)
            .onSnapshot(docs => {
                let data = []
                docs.forEach(doc => {
                    data.push({data: doc.data(), uid: doc.id})
                })
                setData(data)
                
            })

        firestore()
            .collection(`users/${currentUser.uid}/shops/${shopUid}/history`)
            .orderBy('date', 'asc')
            .onSnapshot(docs => {
                let historyData = []
                docs.forEach(doc => {
                    historyData.push({data: doc.data(), uid: doc.id})
                })
                setHistoryData(historyData);
                setFilteredData(historyData);
            })

    }, [])

    const searchItem = (text) => {
        setFilteredData(historyData.filter((el) => el.data.itemName.toLowerCase().includes(text.toLowerCase()) || el.data.date.toLowerCase().includes(text.toLowerCase())))
    }


    return(
        <ScrollView style={styles.backgroundStyle} contentContainerStyle={{flex: 1}}>

            <View style={styles.headerStyle}>

            <BackIcon name="arrow-left" size={30} style={styles.backIconStyle} onPress={() => navigation.goBack()} />
                
                    <Text style={styles.headerTextStyle}>{shopName}</Text>
                
                
                <CardSection style={styles.searchBarStyle}>
                    <SearchIcon name="search" size={20} style={styles.searchIconStyle} />
                    <TextInput 
                        style={styles.textInputStyle} 
                        placeholder="Search" 
                        onChangeText={(text) => searchItem(text)} 
                        placeholderTextColor='#fff'
                    />
                </CardSection>

            </View>
            <View style={{flexDirection: 'row'}}>
                {filteredData.length ? <Text style={[styles.textStyle,{marginBottom: -10, flex: 1, marginLeft: 170}]}>History</Text>:null}
                <TouchableWithoutFeedback onPress={() => navigation.navigate('analytics', {history: historyData})}>
                    <AnalyticsIcon name="linechart" size={30} color="#fff" style={{marginRight: 25}} />
                </TouchableWithoutFeedback>
            </View>
            {filteredData.length
            ?<ScrollView style={[styles.borderStyle, {marginBottom: 0}]} horizontal={true} showsHorizontalScrollIndicator={false}>
                {filteredData.map((item, index) => <View key={index}>
                    <HistoryItem item={item.data} shopUid={shopUid} shopName={shopName} itemUid={item.uid} />
                </View>)}
            </ScrollView>:null}

            {data.length ? <Text style={[styles.textStyle,{ marginBottom:30}]}>{editData}</Text> : null}
            {data.length
                ?<ScrollView style={styles.borderStyle}>
                    {data.map((item, index) => <View key={index}>
                        <IndividualItem item={item.data} shopUid={shopUid} shopName={shopName} itemUid={item.uid} navigation={navigation} />
                    </View>)}
                </ScrollView>:null
            }

            {filteredData.length === 0 && data.length===0 ? <View style={{flex:9.6}}></View>:null}
            

            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 0.3, flexDirection: 'row'}}>

                <TouchableWithoutFeedback onPress={() => navigation.navigate('createItem', {shopUid: shopUid, shopName: shopName})}>

                    <AddIcon name="pluscircle" size={60} color="#b030b0" style={styles.addIconStyle} />

                </TouchableWithoutFeedback>

            </View>

        </ScrollView>
    )

}

const styles = {
    backgroundStyle: {
        flex: 10, 
        backgroundColor: '#121212'
    },
    addIconStyle: {
        paddingRight: 40,
        paddingBottom: 40
    },
    backIconStyle: {
        margin: 20, 
        marginTop: 35, 
        color: '#fff',
        marginRight: 5
    },
    searchIconStyle: {
        alignSelf: 'center', 
        paddingRight: 5, 
        color: '#fff'
    },
    searchBarStyle: {
        borderWidth: 1,
        borderColor: '#b030b0',
        marginHorizontal: 25,
        marginTop: 25,
        paddingVertical: -5,
        height: 50,
        flex: 1,
        paddingLeft: 10
    },
    borderStyle: {
        flex: 4.8, 
        borderColor: '#b030b0'
    },
    headerStyle: {
        flexDirection: 'row',
        marginTop: 50, 
        marginBottom: 20
    },
    headerTextStyle: {
        fontSize: 30, 
        fontWeight: 'bold', 
        marginLeft: 25, 
        marginTop: 30, 
        color: '#fff', 
        marginBottom: 20
    },
    textInputStyle: {
        fontSize: 15, 
        flex: 1, 
        color: '#fff'
    },
    textStyle: {
        alignSelf: 'center', 
        fontSize: 18, 
        fontStyle: 'italic', 
        fontWeight: 'bold', 
        color: '#fff'
    }
}

export default Items;