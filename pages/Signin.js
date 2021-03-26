import React from 'react';
import {View,Text, StyleSheet,Image, TouchableOpacity} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Input from '../components/Input'
import Spinner from '../components/Spinner';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class SignIn extends React.Component {  
  state = {
    numeroarray:[],
    email:'mohamad_kaiss@hotmail.com',
    password:'12345678',
    error:'',
    loading:false,
    Dentists:[],
  };
  
  navigatetoSignUp(){
      this.props.navigation.navigate('SignUp');
  }

  navigatetoForgotPass(){
    this.props.navigation.navigate('ForgotPassword');
  }

  onButtonPress(){
    const {email,password,regId} = this.state;
    this.setState({loading:false});

    auth().signInWithEmailAndPassword(email,password)
  .then(this.onLoginSuccess.bind(this))
   .catch(()=>{
      this.setState({error:'Authentication failed!',loading:false})
    });
  }

  renderButton(){
    if(this.state.loading){
      return <Spinner/>
    }
    return (
      <Button 
          Label={'Se connecter'}
          onButtonPress={this.onButtonPress.bind(this)}
      />
    );
  }

  onLoginSuccess(){
    this.props.navigation.navigate('typedattestation');
  }

  componentWillMount(){
    const usersCollection = firestore().collection('Users');
    // Get user document with an ID of ABC
    const userDocument = firestore()
    .collection('Dentists').get().then( snapshot =>{
      const dentistarray= [];
      snapshot.forEach(doc=>{
        const data = doc.data();
        dentistarray.push(data);
      })
      this.setState({Dentists:dentistarray});
     
    }).catch(error => console.log(error));

    console.log(this.state.Dentists);
    
  }


  render(){

    
    this.state.Dentists.map(dentist=>{
      this.state.numeroarray.push(dentist.numero_inscription);
    })
    console.log(this.state.numeroarray);
    
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
                value={this.state.regId}
                onChangeText={text=>this.setState({regId:text})}
                placeholder={'Numero inscription'}
              
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
              <View style={{flex:1}}>
                <Text style={{fontSize:11}}>Se souvenir de moi</Text>
              </View>
                <TouchableOpacity onPress={this.navigatetoForgotPass.bind(this)} >
                     <Text style={{color:'blue',fontSize:12}}>Mot de passe oublié?</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            
            <CardSection>
            {this.renderButton()}
            </CardSection>

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
})


export default SignIn;

