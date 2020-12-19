import React from "react";
import {Router, Scene} from "react-native-router-flux";
import Login from "./Component/Login";

const RouterComponent = () => {
    return(
        <Router>
            <Scene key="root">
                <Scene key="authFlow" hideNavBar>
                    <Scene key="Login" component={Login} hideNavBar />
                </Scene>
            </Scene>
        </Router>
    )
}

export default RouterComponent;