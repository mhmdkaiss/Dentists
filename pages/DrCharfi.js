import React from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import HButton from '../components/heartPage/HButton';

class DrCharfi extends React.Component {  
 
  render(){
      return (
        
        <View style={styles.containerForm}>

            <View style={styles.imageContainer}>
                <View style={styles.titlesubContainerStyle}>
                    <Text style={styles.titleStyle}>Dr Mohamad Charfi</Text>
                    <Text >Libre Pratique</Text>
                </View>
                <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
            </View>
            
            <View style={styles.PublicitesStyleContainer}>
                <HButton label={'Payer cotisation'}/>
                <HButton label={'Demander une attestation'}/>
            </View>
        
        
        </View>
    
        
    );
  };
}

const styles= StyleSheet.create({
  containerForm:{
    flex:1,
    backgroundColor:'white'
  }
  ,
  imageContainer:{
    flexDirection:'row',
    alignItems:'center'
  }
  ,
  imageStyle:{
    alignSelf:'flex-end',
    height:150,
    width:100,
  }
  ,
  titlesubContainerStyle:{
      flex:1,
      paddingLeft:20,
  }
  ,
  titleStyle:{
    fontSize:16,
    fontWeight:'bold'
  }
  
  ,
  PublicitesStyleContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }

})


export default DrCharfi;

