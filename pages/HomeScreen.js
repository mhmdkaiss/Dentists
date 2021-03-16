import React,{Component} from 'react';
import {View,Text, StyleSheet} from 'react-native';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Button from '../components/Button';
import Input from '../components/Input'
import Spinner from '../components/Spinner';
import Feather from 'react-native-vector-icons/Feather';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class RegistrationForm extends Component {
  state = {email:'',password:'',regId:'',error:'',loading:false,iconType:'Feather'};

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
  iconTypeFun(){
    // switch('feather'){
    //   case 'feather':
    //     return <Text>feather!</Text>;
    //   default:
    //     return <Text>nothing</Text>
    // }
    return <Text>feather</Text>
  }

  renderButton(){
    if(this.state.loading){
      return <Spinner/>
    }
    
      return (
        <Button 
            buttonText={'Sign Up'}
            onButtonPress={this.onButtonPress.bind(this)}
        />
        );
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
                iconName={'search'}
                iconColor={'red'}
                value={this.state.email}
                onChangeText={text=>this.setState({email:text})}
                placeholder={'E-mail'}
              
                />
            </CardSection>

            <CardSection>
            <Input 
                iconName={'search'}
                iconColor={'red'}
                value={this.state.password}
                onChangeText={password=>this.setState({password})}
                placeholder={'password'}
                secureTextEntry
                iconType={this.iconTypeFun.bind(this)}
                />
            </CardSection> 

            <CardSection>
            <Input 
                iconName={'search'}
                iconColor={'red'}
                value={this.state.regId}
                onChangeText={regId=>this.setState({regId})}
                placeholder={'Numero inscription'}
                iconType={()=><Text>hey</Text>}
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
  ,
 
})


export default RegistrationForm;

