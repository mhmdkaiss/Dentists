import React from 'react';
import {StyleSheet,Text,TouchableOpacity} from 'react-native';

const CardSection = ({buttonText,onButtonPress}) => {
    return(
       <TouchableOpacity style={styles.buttonStyle} onPress={onButtonPress}>
           <Text style={styles.textStyle}>{buttonText}</Text>
       </TouchableOpacity>
   
    );
};

const styles = StyleSheet.create({
    textStyle:{
        alignSelf:'center',
        color:'#fff',
        fontSize:16,
        fontWeight:'600',
    },
    buttonStyle:{
        flex:1,
        alignSelf:'stretch',
        backgroundColor:'#8C28C8',
        borderRadius:5,
        borderWidth:1,
        marginLeft:5,
        marginRight:5,
    }

})

export default CardSection;