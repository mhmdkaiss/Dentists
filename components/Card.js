import React from 'react';
import {View,StyleSheet} from 'react-native';

const CardSection = (props) => {
    return(
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle:{
        borderWidth:1,
        padding:5,
        margin:10,
        backgroundColor:'#E6EBED',
        justifyContent:'flex-start',
        borderColor:'#ddd',
        position:'relative',
    }
})

export default CardSection;