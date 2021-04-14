import React from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import HButton from '../components/heartPage/HButton';
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

class HeartPage extends React.Component {  

  navigatetoActualite(){
    this.props.navigation.navigate('ActualitePage');
  }

  navigatetoDocuments(){
    this.props.navigation.navigate('DocumentsPage');
  }

  navigatetoRepartition(){
    this.props.navigation.navigate('RepartitionPage');
  }

  navigatetoViewAtt(){
    this.props.navigation.navigate('ViewAttestationPage');
  }
 
  render(){
      return (
        
        <View style={styles.containerForm}>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
              <HButton label={'Actualités'} onButtonPress={this.navigatetoActualite.bind(this)}/>
              <HButton label={'Documents Pratiques'} onButtonPress={this.navigatetoDocuments.bind(this)}/>
              <HButton label={'Repartition'} onButtonPress={this.navigatetoRepartition.bind(this)}/>
              <HButton label={'View Attestations'} onButtonPress={this.navigatetoViewAtt.bind(this)}/>
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
  imageStyle:{
    alignSelf:'flex-end',
    height:22*vh,
    width:25*vw,
  }
  ,
  titleStyle:{
  }
  ,
  PublicitesStyleContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }

})


export default HeartPage;

