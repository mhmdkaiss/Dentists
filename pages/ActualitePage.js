import React from 'react';
import {View,Text, StyleSheet,Image, FlatList, Button, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class ActualitePage extends React.Component { 

  state = {dataList:[],titleMsg:'',message:'',fakeid:'test'};
  
  componentWillMount(){
    this.readfromDB();
  }

  readfromDB(){
    database()
    .ref('/Actualite')
    .on('value', snapshot => {
            const notes = [];
            snapshot.forEach((child) => {
              notes.push({
                titleMsg: child.val().titleMsg,
                message: child.val().message,
                fakeid: child.key,
              });
            });
            this.setState({dataList: notes});
          });
  } 

  deleteMsg(index,id){
    
    console.log(id)
    database()
  .ref(`/Actualite/${id}`)
  .set(null)
  }

  render(){
      return (
        
        <View style={styles.containerForm}>

          <Header Label={'Actualité'}/>

          {/* <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View> */}
          
          <View style={styles.PublicitesStyleContainer}>
              <FlatList
                    data={this.state.dataList}
                    keyExtractor={(list)=>list.fakeid}
                    renderItem={({item,index})=>{
                      // if(item.titleMsg){
                        return(
                            <View style={styles.messagesContainerStyle}>

                              <View style={{flex:1}}>
                                <Text style={styles.titleStyle}>{item.titleMsg}</Text>
                                <Text style={styles.messageStyle}>{item.message}</Text>
                              </View>

                              <View>
                                <TouchableOpacity  onPress={()=>this.deleteMsg(index,item.fakeid)}>
                                  <MaterialIcons name={'delete'} style={styles.iconStyle} size={22}/>
                                </TouchableOpacity>
                              </View>

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
    }
    ,
    messageStyle:{
      color:'grey'
    },
    iconStyle:{
        padding:15,
    },
  
  })


export default ActualitePage;

