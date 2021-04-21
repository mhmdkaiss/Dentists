import React, { useEffect, useState } from 'react';
import {View,Text, StyleSheet,Image,Button} from 'react-native';
import HButton from '../components/heartPage/HButton';
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

import auth from '@react-native-firebase/auth';

import { InterstitialAd, AdEventType, TestIds,RewardedAd, RewardedAdEventType} from '@react-native-firebase/admob';

// ad unit ID :ca-app-pub-7105179578519852/5219868982

// Video Ads Reward Ads
const adUnitIdReward = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-7105179578519852/5219868982';

const rewarded = RewardedAd.createForAdRequest(adUnitIdReward, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function RewardAd() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    
    const eventListener = rewarded.onAdEvent((type, error, reward) => {
      if (type === RewardedAdEventType.LOADED) {
        setLoaded(true);
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of ', reward);
      }
    });

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <Button
      title="Show Rewarded Ad"
      onPress={() => {
        rewarded.show();
      }}
    />
  );
}




/// interstitial Adss
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-7105179578519852/5219868982';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function AdFullScreen() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    
    
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <Button
      title="Pop up Ad"
      onPress={() => {
        interstitial.show();
      }}
    />
  );
}


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

  checkifLoggedIn(){
    if(auth().currentUser!=null){
      return true;
    }
    else return false
  }
 
  render(){
    const test = 
    console.log(test)
      return (
        
        <View style={styles.containerForm}>

        <RewardAd/>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
              <HButton label={'Actualités'} onButtonPress={this.navigatetoActualite.bind(this)}/>
              <HButton label={'Documents Pratiques'} onButtonPress={this.navigatetoDocuments.bind(this)}/>
              <HButton label={'Repartition'} onButtonPress={this.navigatetoRepartition.bind(this)}/>
              { this.checkifLoggedIn()? 
              <HButton label={'View Attestations'} onButtonPress={this.navigatetoViewAtt.bind(this)}/>
                : null}
              
          </View>
        
        <AdFullScreen/>
        
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

