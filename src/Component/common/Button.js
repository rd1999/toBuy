import React from "react";
import {Text, TouchableOpacity} from "react-native";

const Button = ({onPress, children, style}) => {

    const {textStyle, buttonStyle} = styles;

    return(
        <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    textStyle: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 15,
        color: '#fff'
    },
    buttonStyle: {
        alignSelf: 'stretch',
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#333333'
    }
}

export {Button};