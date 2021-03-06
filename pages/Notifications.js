import React from 'react';
import {View,Text, StyleSheet, FlatList, Alert, TouchableOpacity} from 'react-native';
import Header from '../components/header';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Notifications extends React.Component { 

  state = {messageArray:[],numero_insc:0,titleMsg:'',message:'',fakeid:'test'};
  
  componentWillMount(){
    this.readfromDB();
  }

  readfromDB(){

    var sizeNumero = auth().currentUser.email.length-11;
 
    var numero = auth().currentUser.email.slice(0,sizeNumero);
    this.setState({numero_insc:numero})
    
    firestore()
      .collection('Dentists')
      .doc(numero)
      .onSnapshot(documentSnapshot => {
        this.setState({messageArray:documentSnapshot.data().messages});
      });
  
  } 

  deleteMsg(index,message){

    Alert.alert(
      'Supprimer cet élément',
      '',
      [
        {
          text:'SUPPRIMER',
          onPress:()=>
          {
            firestore()
            .collection('Dentists')
            .doc(this.state.numero_insc)
            .update({
              messages: firestore.FieldValue.arrayRemove(message),
          });
          }
        },
        {
          text:'ANNULER',
        }
      ]
    )

   
  }

  render(){
      return (
        
        <View style={styles.containerForm}>
          
          <View style={styles.PublicitesStyleContainer}>
              <FlatList
                    data={this.state.messageArray}
                    keyExtractor={(item)=>item}
                    renderItem={({item,index})=>{
                      // if(item.titleMsg){
                        return(
                            <View style={styles.messagesContainerStyle}>

                                <Text style={styles.titleStyle}>{item}</Text>
                                <TouchableOpacity onPress={()=>this.deleteMsg(index,item)}>                               
                                  <MaterialIcons name={'delete'} style={styles.iconStyle} size={25}/>
                                </TouchableOpacity>
                            </View>
                        ) 
                      // }
                      
                    }}
                />
          </View>
                
        
        </View>
         
    );
  };
}

const styles= StyleSheet.create({
    containerForm:{
      flex:1,
      backgroundColor:'#EEF1F3'
    }
    ,
    imageStyle:{
      alignSelf:'flex-end',
      height:150,
      width:100,
    }
    ,
    PublicitesStyleContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    }
    ,
    messagesContainerStyle:{
      backgroundColor:'white',
      margin:10,
      padding:15,
      borderRadius:10,
      width:330,
      flexDirection:'row'
    }
    ,
    titleStyle:{
      paddingRight:10,
      fontSize:21,
      color:'black',
      paddingBottom:10,
      flex:1
    }
    ,
    messageStyle:{
      color:'grey'
    }
    ,
    iconStyle:{
      padding:4,
  }
  ,
  
  })


export default Notifications;

