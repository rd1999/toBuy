import React, { useEffect, useState } from "react";
import { LogBox } from 'react-native';
import _ from 'lodash';
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import DefaultPage from "./DefaultPage";

const App = () => {

    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {

        LogBox.ignoreAllLogs(['Setting a timer']);
        const _console = _.clone(console);
        console.warn = message => {
        if (message.indexOf('Setting a timer') <= -1) {
            _console.warn(message);
        }
        };

        var firebaseConfig = {
            apiKey: "AIzaSyDTCSso1oIZwJm9EXATmeixDcQ5uBD2x_U",
            authDomain: "grocery-c69c2.firebaseapp.com",
            databaseURL: "https://grocery-c69c2.firebaseio.com",
            projectId: "grocery-c69c2",
            storageBucket: "grocery-c69c2.appspot.com",
            messagingSenderId: "334179515796",
            appId: "1:334179515796:web:ac67ae98148fee0d94e381",
            measurementId: "G-GM701FZ5PM"
          };
          if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
          }

          auth().onAuthStateChanged((user) => {
            if(user){
                setLoggedIn(true);
            }else{
                setLoggedIn(false);
            }
        })

    }, [])

    function renderContent() {
        switch(loggedIn){
            case true:
                return(
                    <MainRouter />
                ) 
            // case false:
            //     return <AuthRouter />
            case false:
                return(
                    <DefaultPage />
                ) 
        }
    }

    return(
        <>
            {renderContent()}
        </>
    )


}

export default App;