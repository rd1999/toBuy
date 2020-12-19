import React, { useState } from "react";
import {View, Text, TouchableWithoutFeedback} from "react-native";
import {VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryLine} from "victory-native"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Select, Option} from "react-native-select-lists"
import {Picker} from "@react-native-community/picker";
import { ScrollView } from "react-native-gesture-handler";
import CalIcon from "react-native-vector-icons/FontAwesome";
import HistoryItem from "./HistoryItem";



const Analytics = ({route}) => {

  const {history} = route.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [isSelected, setSelected] = useState(false);
  let price = 0;

  const data = {
    dataValues: [
      {x:'Jan', y: 0},
      {x:'Feb', y: 0},
      {x:'Mar', y: 0},
      {x:'Apr', y: 0},
      {x:'May', y: 0},
      {x:'Jun', y: 0},
      {x:'Jul', y: 0},
      {x:'Aug', y: 0},
      {x:'Sep', y: 0},
      {x:'Oct', y: 0},
      {x:'Nov', y: 0},
      {x:'Dec', y: 0}
    ]
  }

  var d = new Date();
  var currentYear = d.getFullYear();

  var expense = {[currentYear]: {'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0}}

  function expenses(){
    history.map(individualData => {
      var len = individualData.data.date.length;
      var year = individualData.data.date.substring(len-4,len);
      var month = individualData.data.date.substring(4,7);
      expense[year][month] = expense[year][month] + Number(individualData.data.price)
      data.dataValues.map(data => {
        if(data.x === month){
          data.y = expense[year][month]
        }
      })
    })
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    price = 0
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelected(true);
    setSelectData([]);
    let newDate = date.toString();
    history.map((data) => {
      if(data.data.date.substring(0,15) === newDate.substring(0,15)){
        setSelectData((old) => [...old, data]);
      }
    })
    hideDatePicker();
  }

  return(
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.backgroundStyle}>

        <Text style={styles.headerStyle}>Analytics</Text>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>

        <Text style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold', color: '#fff', alignSelf: 'center', paddingTop: 20}}>Expense Graph of {currentYear}</Text>

        <VictoryChart theme={VictoryTheme.material} style={{ color: '#FBC530' }}>
          <VictoryAxis 
            label="months" 
            style={{
              axis: {stroke: "#756f6a"},
              axisLabel: {fontSize: 20, padding: 33},
              grid: {stroke: ({ tick }) => tick > 0.5 ? "#121212" : "#121212"},
              ticks: {stroke: "grey", size: 7},
              tickLabels: {fontSize: 15, padding: 5}
            }} 
          />
          <VictoryAxis 
            dependentAxis 
            label="expense(Rs)" 
            style={{
              axis: {stroke: "#756f6a"},
              axisLabel: {fontSize: 20, padding: 33},
              grid: {stroke: ({ tick }) => tick > 0.5 ? "#121212" : "#121212"},
              ticks: {stroke: "grey", size: 7},
              tickLabels: {fontSize: 15, padding: 5}
            }}
          />    
          <VictoryBar
            alignment="start"
            data={data.dataValues} 
            style={{data: {fill: '#b030b0'}}}  
            animate={{duration: 2000, onLoad: { duration: 1000 }}} 
          />
        </VictoryChart>
        {expenses()}
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold', color: '#fff', alignSelf: 'center', paddingTop: 30}}>Select the date to get the total expenses</Text>
          <TouchableWithoutFeedback onPress={() => showDatePicker()}>
            <CalIcon name="calendar" size={30} style={{color: '#fff', alignSelf: 'center', paddingVertical: 20, paddingLeft: 0}} />
          </TouchableWithoutFeedback>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {/* <Text style={{color: '#fff'}}>{selectData.length}</Text> */}
        {selectData.map((item, index) => {
          price = price + Number(item.data.price);
          return(
            <View key={index}>
              <HistoryItem item={item.data} />
            </View>
          )
        })}
        {/* {setTotalPrice(price)} */}
        {selectData.length > 0 ? <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', alignSelf: 'center', marginBottom: 40}}>Total expense : {price}</Text> : null}
        {isSelected === true && selectData.length === 0 ? <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', alignSelf: 'center', marginVertical: 40}}>No expenses on this date</Text>: null}
        </ScrollView>
      
      </View>
    </ScrollView>
  )
}

const styles = {
  backgroundStyle: {
    backgroundColor: '#121212',
    paddingLeft: 15,
    paddingTop: 50, 
    paddingBottom: 20,
    flex: 1
  },
  headerStyle: {
    fontSize: 30, 
    fontWeight: 'bold', 
    marginLeft: 25, 
    marginVertical: 30, 
    marginRight: 10, 
    color: '#fff',
    marginBottom: 50
  }
}

export default Analytics;