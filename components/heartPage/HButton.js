import React from 'react';
import {TouchableOpacity,Text,  StyleSheet} from 'react-native';

const HButton = ({label}) => {
    return(
        <TouchableOpacity style={styles.ButtonStyle}>
            <Text style={styles.textStyle}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    ButtonStyle:{
        backgroundColor:'#4548E9',
        borderRadius:25,
        margin:10,
        width:270,
    }
    ,
    textStyle:{
        color:'white',
        fontSize:22,
        padding:15,
        alignSelf:'center'
    }
})

export default HButton;