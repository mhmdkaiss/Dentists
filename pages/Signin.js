import React from 'react';
import {View,Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Input from '../components/Input'
import Spinner from '../components/Spinner';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage'

class SignIn extends React.Component {  
  state = {
    numero:'',
    numeroarray:[],
    password:'',
    error:'',
    loading:false,
    Dentistsdata:[],
    toggleCheckBox:false,
  };
  
  navigatetoSignUp(){
      this.props.navigation.navigate('SignUp');
  }

  navigatetoForgotPass(){
    this.props.navigation.navigate('ForgotPassword');
  }

  onButtonPress(){
    this.setState({loading:true})
    const {numero,password} = this.state;

    if(numero=='' || password==''){
      this.setState({error:'Authentification erronée!',loading:false})
      }
      else{ 
        const str1= numero;
        const str2= '@france.com';
        const numeroEmail= str1.concat(str2);
          auth().signInWithEmailAndPassword(numeroEmail,password)
          .then(this.onLoginSuccess.bind(this))
          .catch(()=>{
          this.setState({error:'Authentication failed!',loading:false})
        });
      }
   
  }

  renderButton(){
    if(this.state.loading){
      return <Spinner/>
    }
    return (
      <CardSection>
      <Button 
          Label={'Se connecter'}
          onButtonPress={this.onButtonPress.bind(this)}
      />
      </CardSection>
    );
  }

  async onLoginSuccess(){
    const {numero,password,toggleCheckBox} = this.state;
    if(toggleCheckBox==true){
      await AsyncStorage.setItem('numero', numero)
      await AsyncStorage.setItem('password', password)
    }

    else{
      await AsyncStorage.removeItem('numero')
      await AsyncStorage.removeItem('password')
    }
    

    this.props.navigation.navigate('DrCharfi');
  }

  async componentWillMount(){

    const savednumero = await AsyncStorage.getItem('numero')
    const savedpassword = await AsyncStorage.getItem('password')
    if (savednumero !== null && savedpassword !==null) {
      this.setState({numero:savednumero,password:savedpassword})
    }
    
    const usersCollection = firestore().collection('Users');
    // Get user document with an ID of ABC
    const userDocument = firestore()
    .collection('Dentists').get().then( snapshot =>{
      const dentistarray= [];
      snapshot.forEach(doc=>{
        const data = doc.data();
        dentistarray.push(data);
      })
      this.setState({Dentistsdata:dentistarray});
     
    }).catch(error => console.log(error));
    
  }


  render(){

    
    this.state.Dentistsdata.map(dentist=>{
      this.state.numeroarray.push(dentist.numero_inscription);
    })
    // console.log(this.state.numeroarray);
    
      return (
        
        <View style={styles.containerForm}>

        <View style={styles.imageContainer}>
            <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
        </View>
        
        <Text style={styles.titleStyle}>Connexion</Text>
        <Card>
            <CardSection> 
                <Input 
                iconName={'account-circle'}
                iconColor={'purple'}
                value={this.state.numero}
                onChangeText={text=>this.setState({numero:text})}
                placeholder={'Numero inscription'}
                keyboardType={'numeric'}
                />
            </CardSection>

            
            <CardSection>
            <Input 
                iconName={'lock-plus'}
                iconColor={'purple'}
                value={this.state.password}
                onChangeText={password=>this.setState({password})}
                placeholder={'Mot de passe'}
                secureTextEntry
                />
            </CardSection> 

            <View style={styles.forgotPasswordContainer}>
              <View style={{flex:1,flexDirection:'row'}}>
              <CheckBox
              value={this.state.toggleCheckBox}
              onValueChange={(newValue) => this.setState({toggleCheckBox:newValue}) }
              // onChange={console.log(this.state.toggleCheckBox)}
              />
                <Text style={{fontSize:11,paddingTop:8}}>Se souvenir de moi</Text>
              </View>
                <TouchableOpacity onPress={this.navigatetoForgotPass.bind(this)} >
                     <Text style={{color:'blue',fontSize:12}}>Mot de passe oublié?</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            
            
            <View>{this.renderButton()}</View>
            

            </Card>
            <View style={styles.noAccountSignUp}>
                <TouchableOpacity onPress={this.navigatetoSignUp.bind(this)} >
                     <Text style={{color:'blue',fontSize:13}}>Créer un compte</Text>
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
  forgotPasswordContainer:{
    flexDirection:'row',
    marginTop:10,
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
  }
  ,
  spinnerStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
}
})


export default SignIn;

