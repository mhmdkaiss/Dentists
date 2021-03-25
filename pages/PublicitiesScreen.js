import React from 'react';
import {View,Text, StyleSheet,Image, FlatList} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/header';

class Publicites extends React.Component { 

  state = {dataList:[],titleMsg:'',message:'',fakeid:''};
  
  componentWillMount(){
    this.readfromDB();
  }

  readfromDB(){
    database()
    .ref('/Publicities')
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
 

  render(){
      return (
        
        <View style={styles.containerForm}>

          <Header Label={'Publicite'}/>

          <View style={styles.imageContainer}>
              <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
          </View>
          
          <View style={styles.PublicitesStyleContainer}>
              <FlatList
                    data={this.state.dataList}
                    keyExtractor={(list)=>list.fakeid}
                    renderItem={({item,index})=>{
                        return(
                            <View style={styles.messagesContainerStyle}>

                                <Text style={styles.titleStyle}>{item.titleMsg}</Text>
                                <Text style={styles.messageStyle}>{item.message}</Text>
                                
                            </View>
                        ) 
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
    backgroundColor:'white'
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
    backgroundColor:'#3b5998',
    margin:10,
    padding:10,
    borderRadius:10,
    width:280,
  }
  ,
  titleStyle:{
    paddingRight:100,
    fontSize:22,
    color:'white',
  }
  ,
  messageStyle:{
    color:'white'
  }

})


export default Publicites;

