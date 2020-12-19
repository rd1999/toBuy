import React from "react";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Items from "./Items";
import List from "./List";
import Analytics from "./Analytics";

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
    return <Tab.Navigator
      initialRouteName="items"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle: { fontSize: 16 },
        style: { backgroundColor: '#121212' },
      }}
    >
      <Tab.Screen
        name="items"
        component={Items}
        options={{ tabBarLabel: 'List' }}
      />
      <Tab.Screen
        name="analytics"
        component={Analytics}
        options={{ tabBarLabel: 'Expenses' }}
      />
    </Tab.Navigator>
}

export default TabNavigator;