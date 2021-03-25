import React from 'react';
import {View,Text, StyleSheet,Image, FlatList, Button} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/header';

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

//   deleteItem(fakeid){
//     database().ref(`/Actualite/${fakeid}`).remove();
// }
 

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

                                <Text style={styles.titleStyle}>{item.titleMsg}</Text>
                                <Text style={styles.messageStyle}>{item.message}</Text>
                                {/* <Button title={'delete'} onPress={()=>this.deleteItem(item.fakeid)}/> */}
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
    }
  
  })


export default ActualitePage;

