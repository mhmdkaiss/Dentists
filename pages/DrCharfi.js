import React from 'react';
import {View,Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import HButton from '../components/heartPage/HButton';
import auth from '@react-native-firebase/auth';
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

import { InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize } from '@react-native-firebase/admob';


class DrCharfi extends React.Component {  

  navigatetoDemandAtt(){
    this.props.navigation.navigate('typedattestation');
  }

  navigatetoNotifications(){
    this.props.navigation.navigate('NotificationsPage');
  }

  logout(){
    auth().signOut();
    this.props.navigation.navigate('SignIn');
  }
 
  render(){
      return (
        
        <View style={styles.containerForm}>

        
            <TouchableOpacity style={styles.logOutButton} onPress={this.logout.bind(this)}>
              <Text style={{color:'white',fontSize:18}}>Déconnexion</Text>
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
            </View>
            
            <View style={styles.PublicitesStyleContainer}>
                <HButton label={'Payer cotisation'}/>
                <HButton label={'Demander une attestation'} onButtonPress={this.navigatetoDemandAtt.bind(this)}/>
                <HButton label={'Notifications'} onButtonPress={this.navigatetoNotifications.bind(this)}/>
            </View>
        
            <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
        
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
    alignItems:'center'
  }
  ,
  imageStyle:{
    alignSelf:'flex-end',
    height:22*vh,
    width:25*vw,
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
  ,
  logOutButton:{
    backgroundColor:'red',
    alignItems:'center',
    paddingRight:20,
  }
})


export default DrCharfi;

