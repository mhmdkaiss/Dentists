import React , {useState,useEffect} from 'react';
import {View,Text, StyleSheet,Image,TouchableOpacity,FlatList, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

const repartition = () => {

    const [GouvernoratSelected, setGouvernoratSelected] = useState('Beja');
    const [Gouvernoratdata, setGouvernoratdata] = useState([]);
    const [DelegationSelected, setDelegationSelected] = useState('');
    const [DelegationNames, setDelegationNames] = useState([]);

    const [Delegationdata, setDelegationdata] = useState([]);

    useEffect(() => { 
      
      firestore()
  .collection('Gouvernorat')
  .get()
  .then(querySnapshot => {
    var array=[];
    querySnapshot.forEach(documentSnapshot => {
      array.push(documentSnapshot.id)
    });
    setGouvernoratdata(array);
  }).then(  firestore()
  .collection('Gouvernorat')
  .doc(`${GouvernoratSelected}`)
  .get()
  .then(documentSnapshot => {
      
    
    if (documentSnapshot.exists) {
      var array=[]
      var arraydata=[]
      array=Object.keys(documentSnapshot.data());
      arraydata=documentSnapshot.data();
    } 
    
    setDelegationdata(arraydata)
    setDelegationNames(array)
  }));
    
  },[GouvernoratSelected,DelegationSelected]);


  const renderData=(DelegationSelected)=>{
    
  if(DelegationSelected){
    return(
      <View>
        <Text>Libre Pratique :{Delegationdata[DelegationSelected][0]}</Text>     
        <Text>Sante Publique :{Delegationdata[DelegationSelected][1]}</Text> 
        <Text>Chomeurs :{Delegationdata[DelegationSelected][2]}</Text>
      </View>
    )
    }
    else {
      return(
        <View>
          <Text>Libre Pratique :</Text>     
          <Text>Sante Publique :</Text> 
          <Text>Chomeurs :</Text>
        </View>
      )
    }
    
  }
  
    return (
        <View style={{}}>
        <View style={styles.pickerContainer}>
          <Picker
              onValueChange={(itemValue, itemIndex) => {
                setGouvernoratSelected(itemValue)
                setDelegationSelected('')
                }}
                selectedValue={GouvernoratSelected} 
            >
              <Picker.Item label={`${Gouvernoratdata[0]}`} value={`${Gouvernoratdata[0]}`} />
              <Picker.Item label={`${Gouvernoratdata[1]}`} value={`${Gouvernoratdata[1]}`} />
          </Picker>
        </View>
        

        <View style={styles.pickerContainer}> 
          <Picker
              onValueChange={(itemValue, itemIndex) => {
                setDelegationSelected(itemValue)
                }}
                selectedValue={DelegationSelected} 
            >
              <Picker.Item label={`${DelegationNames[0]}`} value={`${DelegationNames[0]}`} />
              <Picker.Item label={`${DelegationNames[1]}`} value={`${DelegationNames[1]}`} />
          </Picker>
        </View>


       
        {renderData(DelegationSelected)}
      

      </View>
 )



}

const styles = StyleSheet.create({
    
    pickerContainer:{
      backgroundColor : "rgb(237,237,237)",
      justifyContent  : "center",
      width:'90%',
      borderRadius:10,
      height:40,
      marginTop:10,
      alignSelf:'center'
    }
})

export default repartition;