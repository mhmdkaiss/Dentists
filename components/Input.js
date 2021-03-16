import React,{Component} from 'react';
import {TextInput, View, Text,StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Input = ({iconType,iconName,iconColor,value,onChangeText,placeholder,secureTextEntry}) =>  {
  state = {text:''};
  const {containerstyle,inputstyle,iconStyle}=styles;
  
        return (
        <View style={containerstyle}>
            {/* <Feather style={iconStyle} name={iconName} color={iconColor} size={20}/> */}
            {iconType}
            <TextInput 
            style={inputstyle}
            value={value}
            onChangeText={onChangeText}
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles= StyleSheet.create({
    containerstyle:{
        flexDirection:'row',
        flex:1,
        height:40,
        alignItems:'center',
    },
    iconStyle:{
        flex:1,
    },
    inputstyle:{
        flex:8,
        fontSize:18
    }
})

export default Input;

