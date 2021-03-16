import React,{Component} from 'react';
import {View,Text, StyleSheet} from 'react-native';
import firebase from 'firebase';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import Input from './Input'
import Spinner from './Spinner';
import Header from './header';
import {addRegIdtodb} from '../api/regIdApi';

class RegistrationForm extends Component {
  state = {email:'test@test.com',password:'12345678',regId:'',error:'',loading:false};

  onButtonPress(){
    const {email,password,regId} = this.state;
    this.setState({error:'',loading:true});

    //stores data to database
    addRegIdtodb(regId,email);
  
    firebase.auth().signInWithEmailAndPassword(email,password)
  .then(this.onLoginSuccess.bind(this))
  .catch(()=>{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(this.onLoginSuccess.bind(this))
    .catch(()=>{
      this.setState({error:'Authentication failed!',loading:false})
    });
  });

  }

  renderButton(){
    if(this.state.loading){
      return <Spinner/>
    }
    
      return (
        <Button 
            buttonText={'login'}
            onButtonPress={this.onButtonPress.bind(this)}
        />);
  }

  onLoginSuccess(){
    this.setState({
      email:'',
      password:'',
      error:'',
      regId:'',
      loading:false,
    })
  }

  render(){
      return (
        <View>
        <Header headerText={'Login'}/>
        <Card>
            <CardSection> 
                <Input 
                label={'Email'}
                value={this.state.email}
                onChangeText={text=>this.setState({email:text})}
                placeholder={'test@test.com'}
              
                />
            </CardSection>

            <CardSection>
            <Input 
                label={'Password'}
                value={this.state.password}
                onChangeText={password=>this.setState({password})}
                placeholder={'password'}
                secureTextEntry
                />
            </CardSection> 

            <CardSection>
            <Input 
                label={'RegId'}
                value={this.state.regId}
                onChangeText={regId=>this.setState({regId})}
                placeholder={'RegId'}
                />
            </CardSection> 

            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
            
            <CardSection>
            {this.renderButton()}
            </CardSection>

           
            
        </Card>

        </View>

        
    );
  };
}

const styles= StyleSheet.create({
  errorTextStyle:{
    fontSize:20,
    alignSelf:'center',
    color:'red',
  }
})


export default RegistrationForm;

