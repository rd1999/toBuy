import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Shops from "./Component/Shops";
import CreateShop from "./Component/CreateShop";
import Items from "./Component/Items";
import CreateItem from "./Component/CreateItem";
import EditItem from "./Component/EditItem";
import Analytics from "./Component/Analytics";
import TabNavigation from "./Component/TabNavigation";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function MainRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: config
          } 
        }}
      >
        <Stack.Screen name="shops" component={Shops} options={{headerShown: false}} />
        <Stack.Screen name="createShop" component={CreateShop} options={{headerShown: false}} />
        <Stack.Screen name="itemList" component={Items} options={{headerShown: false}} />
        <Stack.Screen name="createItem" component={CreateItem} options={{headerShown: false}} />
        <Stack.Screen name="editItem" component={EditItem} options={{headerShown: false}} />
        <Stack.Screen name="analytics" component={Analytics} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainRouter;




// import React from "react";
// import {Router, Scene} from "react-native-router-flux";
// import Shops from "./Component/Shops";
// import CreateShop from "./Component/CreateShop";
// import Items from "./Component/Items";
// import CreateItem from "./Component/CreateItem";
// import EditItem from "./Component/EditItem";
// import Analytics from "./Component/Analytics";

// const RouterComponent = () => {
//     return(
//         <Router>
//             <Scene key="root" hideNavBar titleStyle={styles.navigationBarTitleStyle}>
//                 <Scene key="mainFlow" transitionConfig={transitionConfig}>
//                     <Scene key="shops" component={Shops} hideNavBar initial  />
//                     <Scene key="createShop" component={CreateShop} hideNavBar />
//                     <Scene key="items" component={Items} hideNavBar />
//                     <Scene key="createItem" component={CreateItem} hideNavBar />
//                     <Scene key="editItem" component={EditItem} hideNavBar />
//                     <Scene key="analytics" component={Analytics} hideNavBar />
//                 </Scene>
//             </Scene>
//         </Router>
//     )
// }

// const MyTransitionSpec = ({
//     duration: 500,
//     // easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
//     // timing: Animated.timing,
// });

// const transitionConfig = () => ({
//     transitionSpec: MyTransitionSpec,
//     // screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
//     screenInterpolator: sceneProps => {
//         const { layout, position, scene } = sceneProps;
//         const { index } = scene;
//         const width = layout.initWidth;

//         if(scene.route.routeName === 'items'){
//             const inputRange = [index - 1, index, index + 1];

//             const opacity = position.interpolate({
//                 inputRange,
//                 outputRange: ([0, 1, 0]),
//             });

//             const translateX = position.interpolate({
//                 inputRange,
//                 outputRange: ([width, 0, 0]),
//             });

//             return {
//                 opacity,
//                 transform: [
//                     { translateX }
//                 ],
//             };
//         }else if(scene.route.routeName === 'shops'){
//             const inputRange = [index - 1, index, index + 1];

//             const opacity = position.interpolate({
//                 inputRange,
//                 outputRange: ([0, 1, 0]),
//             });

//             const translateX = position.interpolate({
//                 inputRange,
//                 outputRange: ([-width, 0, 0]),
//             });

//             return {
//                 opacity,
//                 transform: [
//                     { translateX }
//                 ],
//             };
//         }else if(scene.route.routeName === 'createItem'){
//             const inputRange = [index - 1, index, index + 1];

//             const opacity = position.interpolate({
//                 inputRange,
//                 outputRange: ([0, 1, 0]),
//             });

//             const translateX = position.interpolate({
//                 inputRange,
//                 outputRange: ([width, 0, 0]),
//             });

//             return {
//                 opacity,
//                 transform: [
//                     { translateX }
//                 ],
//             };
//         }else if(scene.route.routeName === 'createShop'){
//             const inputRange = [index - 1, index, index + 1];

//             const opacity = position.interpolate({
//                 inputRange,
//                 outputRange: ([0, 1, 0]),
//             });

//             const translateX = position.interpolate({
//                 inputRange,
//                 outputRange: ([width, 0, 0]),
//             });

//             return {
//                 opacity,
//                 transform: [
//                     { translateX }
//                 ],
//             };
//         }else if(scene.route.routeName === 'editItem'){
//             const inputRange = [index - 1, index, index + 1];

//             const opacity = position.interpolate({
//                 inputRange,
//                 outputRange: ([0, 1, 0]),
//             });

//             const translateX = position.interpolate({
//                 inputRange,
//                 outputRange: ([width, 0, 0]),
//             });

//             return {
//                 opacity,
//                 transform: [
//                     { translateX }
//                 ],
//             };
//         }
//     }
// });

// const styles = {
//     navigationBarTitleStyle: {
//      flex: 1,
//      textAlign: 'center',
//      fontSize: 24,
//      fontWeight: 'bold'
//     }
//  }

// export default RouterComponent;