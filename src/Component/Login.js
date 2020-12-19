import React, { useState } from "react";
import {View, Text, TextInput} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import {Actions} from "react-native-router-flux";
import {CardSection, Button, Spinner} from "./common";

const Login = () => {

    const {headerStyle, cardStyle, textInputStyle, iconStyle, buttonStyle} = styles;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
 
    async function onButtonPress() {

        if(email && password){
            setError("");
        setIsLoading(true);

        await auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setIsLoading(false);
                Actions.mainFlow();
            })
            .catch(async () => {
                await auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        setEmail('');
                        setPassword('');
                        setIsLoading(false);
                        Actions.mainFlow();
                    })
                    .catch(() => {
                        setError("Authentication Failed!!!")
                        setIsLoading(false);
                    })
            })
        }else{
            alert("Please enter email and password!!!");
        }

        
    }

    function renderButton(){
        if(isLoading === true){
            return <Spinner size='large' />
        }

        return(
            <Button onPress={() => onButtonPress()}>
                Login
            </Button>
        )
    }

    return(
        <View>
            <Text style={headerStyle}>
                Login
            </Text>
            <CardSection style={cardStyle}>
                <Icon name="envelope" size={30} style={iconStyle} />
                <TextInput 
                    style={textInputStyle} 
                    placeholder="Email" 
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
            </CardSection>
            <CardSection style={cardStyle}>
                <Icon name="lock" size={30} style={iconStyle} />
                <TextInput 
                    style={textInputStyle} 
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry
                />
            </CardSection>
            <Text style={styles.errorStyle}>{error}</Text>
            <CardSection style={buttonStyle}>
                {renderButton()}
            </CardSection>
        </View>
    )
}

const styles = {
    headerStyle: {
        fontSize: 48,
        alignSelf: 'center',
        paddingTop: 130,
        paddingBottom: 60,
        color: '#d2e603'
    },
    cardStyle: {
        marginHorizontal: 30,
        marginVertical: 7,
        borderColor: '#d2e603'
    },
    textInputStyle: {
        fontSize: 17,
        flex: 1,
        alignSelf: 'center'
    },
    iconStyle: {
        alignSelf: 'center',
        paddingRight: 10
    },
    buttonStyle: {
        borderBottomWidth: 0,
        marginHorizontal: 20,
        paddingTop: 25
    },
    errorStyle: {
        color: 'red',
        alignSelf: 'center',
        fontSize: 18,
        paddingTop: 25
    }
}

export default Login;