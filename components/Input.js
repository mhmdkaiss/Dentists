import React,{Component} from 'react';
import {TextInput, View, Text,StyleSheet} from 'react-native';

const Input = ({label,value,onChangeText,placeholder,secureTextEntry}) =>  {
  state = {text:''};
  const {containerstyle,labelstyle,inputstyle}=styles;
        return (
        <View style={containerstyle}>
            <Text style={labelstyle}>{label}</Text>
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
    labelstyle:{
        flex:1,
        fontSize:18,
    },
    inputstyle:{
        flex:2,
        fontSize:18
    }
})

export default Input;

