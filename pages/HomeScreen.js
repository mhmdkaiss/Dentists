import React,{Component} from 'react';
import {View,Text, StyleSheet} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Input from '../components/Input'
import Spinner from '../components/Spinner';
import Header from '../components/header';

class RegistrationForm extends Component {
  state = {email:'test@test.com',password:'12345678',regId:'',error:'',loading:false};

  onButtonPress(){
    // const {email,password,regId} = this.state;
    this.setState({error:'',loading:true});

  
//     firebase.auth().signInWithEmailAndPassword(email,password)
//   .then(this.onLoginSuccess.bind(this))
//   .catch(()=>{
//     firebase.auth().createUserWithEmailAndPassword(email,password)
//     .then(this.onLoginSuccess.bind(this))
//     .catch(()=>{
//       this.setState({error:'Authentication failed!',loading:false})
//     });
//   });

  }

  renderButton(){
    if(this.state.loading){
      return <Spinner/>
    }
    
      return (
        <Button 
            buttonText={'Sign Up'}
            onButtonPress={this.onButtonPress.bind(this)}
        />);
  }

//   onLoginSuccess(){
//     this.setState({
//       email:'',
//       password:'',
//       error:'',
//       regId:'',
//       loading:false,
//     })
//   }

  render(){
      return (
        
        <View style={styles.containerForm}>

        <Text style={styles.titleStyle}>Sign Up</Text>
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
  containerForm:{
    flex:1,
    justifyContent:'center',
  }
  ,
  titleStyle:{
    alignSelf:'center',
    fontSize:22
  }
  ,
  errorTextStyle:{
    fontSize:20,
    alignSelf:'center',
    color:'red',
  }
})


export default RegistrationForm;

