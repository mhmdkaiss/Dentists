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

    const [change, setchange] = useState(0);

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
    
  },[GouvernoratSelected,DelegationSelected,change]);


  const renderData=(DelegationSelected)=>{
    
  if(DelegationSelected){
    return(
      <View style={styles.dataContainer}>
        <Text style={styles.TextStyle}>Libre Pratique :{Delegationdata[DelegationSelected][0]}</Text>     
        <Text style={styles.TextStyle}>Sante Publique :{Delegationdata[DelegationSelected][1]}</Text> 
        <Text style={styles.TextStyle}>Chomeurs :{Delegationdata[DelegationSelected][2]}</Text>
      </View>
    )
    }
    else {
      return(
        <View style={styles.dataContainer}>
          <Text style={styles.TextStyle}>Libre Pratique :</Text>     
          <Text style={styles.TextStyle}>Sante Publique :</Text> 
          <Text style={styles.TextStyle}>Chomeurs :</Text>
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
              <Picker.Item label={`${Gouvernoratdata[2]}`} value={`${Gouvernoratdata[2]}`} />
              <Picker.Item label={`${Gouvernoratdata[3]}`} value={`${Gouvernoratdata[3]}`} />
          </Picker>
        </View>
        

        <View style={styles.pickerContainer}> 
          <Picker
              onValueChange={(itemValue, itemIndex) => {
                setDelegationSelected(itemValue)
                setchange(change+1)
                }}
                selectedValue={DelegationSelected} 
            >
              <Picker.Item label={`${DelegationNames[0]}`} value={`${DelegationNames[0]}`} />
              <Picker.Item label={`${DelegationNames[1]}`} value={`${DelegationNames[1]}`} />
              <Picker.Item label={`${DelegationNames[2]}`} value={`${DelegationNames[2]}`} />
              <Picker.Item label={`${DelegationNames[3]}`} value={`${DelegationNames[3]}`} />
              <Picker.Item label={`${DelegationNames[4]}`} value={`${DelegationNames[4]}`} />
              {DelegationNames[5]?<Picker.Item label={`${DelegationNames[5]}`} value={`${DelegationNames[5]}`}/>:null}
              {DelegationNames[6]?<Picker.Item label={`${DelegationNames[6]}`} value={`${DelegationNames[6]}`}/>:null}
              {DelegationNames[7]?<Picker.Item label={`${DelegationNames[7]}`} value={`${DelegationNames[7]}`}/>:null}
              {DelegationNames[8]?<Picker.Item label={`${DelegationNames[8]}`} value={`${DelegationNames[8]}`}/>:null}
              {DelegationNames[9]?<Picker.Item label={`${DelegationNames[9]}`} value={`${DelegationNames[9]}`}/>:null}
              {DelegationNames[10]?<Picker.Item label={`${DelegationNames[10]}`} value={`${DelegationNames[10]}`}/>:null}
              
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
      alignSelf:'center',
    }
    ,
    dataContainer:{
      alignItems:'center',
      padding:50
    }
    ,
    TextStyle:{
      margin:20,
      fontSize:17,
    }
})

export default repartition;