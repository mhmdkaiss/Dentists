import React from 'react';
import {View,ActivityIndicator, StyleSheet} from 'react-native';

const Spinner = () =>{
    return(
        
            <ActivityIndicator size="large" color="#0000ff" />
        
    );
}

const styles = StyleSheet.create({
    // spinnerStyle:{
    //     flex:1,
    //     justifyContent:'center',
    //     alignItems:'center',
    // }
})

export default Spinner;