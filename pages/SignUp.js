import React from 'react';
import {View,Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Input from '../components/Input'
import Spinner from '../components/Spinner';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class RegistrationForm extends React.Component {  
  
  state = {
    numeroarray:[],
    numeroArraydata:[],
    numero:'',
    numero_insc:'',
    email:'',
    password:'',
    error:'',
    loading:false,
    Dentistsdata:[],
  };

  navigateScreen(){
    this.props.navigation.navigate('SignIn');
  }
  
  onButtonPress(){
      const {numero,password} = this.state;
      const numeroString = parseInt(numero);
      this.setState({numero_insc:numeroString});
      
      const str1= numero;
      const str2= '@france.com';
      const numeroEmail= str1.concat(str2);

      const intNumero=parseInt(numero);
     
     if(this.validateEmail(this.state.email) &&this.validateNumero(intNumero)){
        auth().createUserWithEmailAndPassword(numeroEmail,password)
          .then(this.onLoginSuccess.bind(this))
          .catch(()=>{
            this.setState({error:'Authentication failed!',loading:false})
          }); 
      }
      else {
        this.setState({error:'invalid email or numero'})
      }
  }
 
  renderButton(){
    if(this.state.loading){
      return <Spinner/>
    }
    return (
        <Button 
            Label = {'Cree compte'}
            onButtonPress={this.onButtonPress.bind(this)}
        />
        );
  }

  onLoginSuccess(){
     firestore()
    .collection('Dentists')
    .doc(`${this.state.numero_insc}`)
    .set({
      email: this.state.email,
      numero_inscription: this.state.numero_insc,
      messages:[],
      paid:false,
    });

    this.setState({
      email:'',
      password:'',
      error:'',
      loading:false,
      numero:'',
    });
    this.props.navigation.navigate('SignIn');
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateNumero(numero){
    const {numeroarray} = this.state;
    console.log(numeroarray);
    if(numeroarray.includes(numero)){
      return true;
    }
    else{return false};
  }

  componentDidMount(){
    // Get Dentists Data and put them in Dentistdata array
    firestore().collection('Dentists').get().then( snapshot =>{
      const dentistarray= [];
      snapshot.forEach(doc=>{
        const data = doc.data();
        dentistarray.push(data);
      })
      this.setState({Dentistsdata:dentistarray});
      console.log(this.state.Dentistsdata);  
    }).catch(error => console.log(error));  

// get numeros for inscription
    firestore().collection('Validnumeros').get().then( snapshot =>{
      const array= [];
      snapshot.forEach(doc=>{
        const data = doc.data();
        array.push(data);
      })
      this.setState({numeroArraydata:array});

      //fill numeroarray with existing numeros from firestore
      this.state.numeroArraydata.map(item=>{
        this.state.numeroarray.push(item.numero_inscription);
      })
    //  console.log(this.state.numeroarray);
    }).catch(error => console.log(error));  
  }

  render(){

     return (
        
        <View style={styles.containerForm}>

        <View style={styles.imageContainer}>
            <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
        </View>

        <Text style={styles.titleStyle}>Créer un compte</Text>
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
                iconName={'email-open'}
                iconColor={'purple'}
                value={this.state.email}
                onChangeText={email=>this.setState({email})}
                placeholder={'E-mail'}
                />
            </CardSection> 

            <CardSection>
            <Input 
                iconName={'lock-plus'}
                iconColor={'purple'}
                value={this.state.password}
                onChangeText={password=>this.setState({password})}
                placeholder={'password'}
                secureTextEntry
                />
            </CardSection> 

            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            
            <CardSection>
            {this.renderButton()}
            </CardSection>

            </Card>
            <View style={styles.alreadyhaveAccount}>
              <Text style={{fontSize:11}}> </Text>
              <TouchableOpacity onPress={this.navigateScreen.bind(this)}>
                     <Text style={{color:'blue',fontSize:12}}>Connexion</Text>
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
    color:'red',
  }
  ,
  alreadyhaveAccount:{
    alignSelf:'center',
    flexDirection:'row'
  }
})


export default RegistrationForm;

