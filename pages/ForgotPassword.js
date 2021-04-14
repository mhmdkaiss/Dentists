import React from 'react';
import {View,Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Input from '../components/Input'
import Spinner from '../components/Spinner';
import auth from '@react-native-firebase/auth';

class ForgotPassword extends React.Component {  
  state = {email:'',error:'',loading:false};
  
  navigatetoSignIn(){
      this.props.navigation.navigate('SignIn');
  }

  navigatetoForgotPass(){
    this.props.navigation.navigate('ForgotPassword');
  }

  onButtonPress(){
    const {email,password} = this.state;
    this.setState({error:'Vérifiez maintenant votre boîte de réception',loading:false});

    auth().sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });

  }

  renderButton(){
    if(this.state.loading){
      return <Spinner/>
    }
    
      return (
        <Button 
            Label={'Réinitialiser le mot de passe'}
            onButtonPress={this.onButtonPress.bind(this)}
        />
        );
  }

  render(){
      return (
        
        <View style={styles.containerForm}>

        <View style={styles.imageContainer}>
            <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
        </View>
        
        <Text style={styles.titleStyle}>Mot de passe oublié?</Text>
        <Card>
        <CardSection>
            <Input 
                iconName={'email-open'}
                iconColor={'purple'}
                value={this.state.email}
                onChangeText={email=>this.setState({email})}
                placeholder={'E-mail'}
                />
            </CardSection> 


            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            
            <CardSection>
            {this.renderButton()}
            </CardSection>

            </Card>
            <View style={styles.noAccountSignUp}>
              <Text style={{fontSize:14}}>Revenir à </Text>
                <TouchableOpacity onPress={this.navigatetoSignIn.bind(this)} >
                     <Text style={{color:'blue',fontSize:15}}>Connexion</Text>
                </TouchableOpacity>
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
    height:150,
    width:100,
  }
  ,
  titleStyle:{
    alignSelf:'center',
    fontSize:22,
  }
  ,
  errorTextStyle:{
    fontSize:20,
    alignSelf:'center',
    color:'red'
  }
  ,
  noAccountSignUp:{
    alignSelf:'center',
    flexDirection:'row',
    marginTop:20,
  }
})


export default ForgotPassword;

