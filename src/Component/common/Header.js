import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import BackIcon from "react-native-vector-icons/AntDesign";
import {Actions} from "react-native-router-flux";

const Header = ({headerText, children, backButton}) =>{
  return(
    <View style={styles.viewStyle}>
    <View style={{flexDirection: 'row'}}>
      {backButton === true && <TouchableOpacity onPress={() => Actions.shops()}><BackIcon name="arrowleft" size={30} style={styles.iconStyle} /></TouchableOpacity>}
      {backButton === true 
        ? <View style={{flex: 1, alignItems: 'center'}}><Text style={{fontSize: 24, fontWeight: 'bold', marginLeft: -30}}>{headerText}</Text></View>
        : <View style={{flex: 1, alignItems: 'center'}}><Text style={{fontSize: 24, fontWeight: 'bold', marginRight: -30}}>{headerText}</Text></View>
      }
      {children}
      </View>
    </View>
  )
} 

const styles = {
  viewStyle: {
    backgroundColor: '#d2e603',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    shadowColor: '#000',
    shadowOffSet: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation : 2,
    position: 'relative',
    flexDirection: 'column',
    marginBottom: 30,
  },
  iconStyle: {
    paddingLeft: 10
  }
};

export {Header};
