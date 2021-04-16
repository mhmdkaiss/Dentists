import React from 'react';
import {View,Text, StyleSheet,Image, FlatList, ScrollView} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../components/header';
import firestore from '@react-native-firebase/firestore';

class Publicites extends React.Component { 

  state = {dataList:[],titleMsg:'',message:'',fakeid:''};

  componentDidMount(){
    firestore()
    .collection('Publicities')
    .get()
    .then(querySnapshot => {
      const array=[];
      querySnapshot.forEach(documentSnapshot => {
        array.push(documentSnapshot.data());
      });
      this.setState({dataList:array})
        // console.log(this.state.dataList);
    });
  }
 

  render(){
      return (
        
        <View style={styles.containerForm}>

          <Header Label={'Publicite'}/>

         
          
          <View style={styles.PublicitesStyleContainer}>
              <FlatList
                    data={this.state.dataList}
                    keyExtractor={(list)=>list.fakeid}
                    renderItem={({item,index})=>{
                      // if(item.titleMsg){
                        return(
                            <View style={styles.messagesContainerStyle}>

                                <View style={styles.imageContainer}>
                                  <Image style={styles.imageStyle} source={{uri:`${item.download}`}}/>
                                </View>

                                <Text style={styles.titleStyle}>{item.titlemessage}</Text>
                                <Text style={styles.messageStyle}>{item.message}</Text>
                                
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
    height:200,
    width:'100%',
    borderRadius:10
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
    padding:5,
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


export default Publicites;

