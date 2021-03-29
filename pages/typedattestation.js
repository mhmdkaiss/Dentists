import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {View,Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class typedattestation extends React.Component { 
  
  state = {RegId:'',typeofAttestation:'Ouverture',envoyerPoste:false,envoyerMail:false,email:'',name:''};
  

  sendData() {
    const {typeofAttestation,envoyerMail,envoyerPoste} = this.state;

    console.log(auth().currentUser);

      database()
    .ref(`/users/${auth().currentUser.uid}`)
    .set({
      id: auth().currentUser.uid,
      type: typeofAttestation,
      envoyerMail: envoyerMail,
      envoyerPoste:envoyerPoste,
      email:auth().currentUser.email,
      name:auth().currentUser.displayName,
    });

    alert('Demande envoyer');



    const doc = new jsPDF();
    doc.text(10, 10, 'Hello world!');
    doc.save('hello-world.pdf');
  }

  
  render(){
      return (
        
        <View style={styles.containerForm}>

            <View style={styles.imageContainer}>
                <View style={styles.titlesubContainerStyle}>
                    <Text style={styles.titleStyle}>Dr Mohamad Charfi</Text>
                    <Text >Libre Pratique</Text>
                </View>
                <Image style={styles.imageStyle} source={require('../assets/Nord-Quest.png')}/>
            </View>
            
            
            <View style={{marginLeft:10,marginTop:10}}> 
                <Text style={{color:'blue',fontSize:17}}>Veuillez Choisir le type dattestation</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({typeofAttestation:itemValue})
                        }}
                        selectedValue={this.state.typeofAttestation} 
                    >
                      <Picker.Item label="Ouverture" value="Ouverture" />
                      <Picker.Item label="Inscription" value="Inscription" />
                      <Picker.Item label="Exercice" value="Exercice" />
                      <Picker.Item label="Bonne Conduire" value="Bonne Conduire" />
                  </Picker>
                </View>
            </View>  
        
           <View style={styles.togglesContainer}>
              <View>
                <ToggleSwitch
                      isOn={this.state.envoyerPoste}
                      onColor="green"
                      offColor="grey"
                      label="Envoyer l attestation via poste"
                      labelStyle={{ color: "black", fontWeight: "300" }}
                      size="medium"
                      onToggle={isOn => this.setState({envoyerPoste:isOn})}
                />
               </View>
               <View style={{marginTop:20}}>
                  <ToggleSwitch
                      isOn={this.state.envoyerMail}
                      onColor="green"
                      offColor="grey"
                      label="Envoyer l attestation via Mail"
                      labelStyle={{ color: "black", fontWeight: "300" }}
                      size="medium"
                      onToggle={isOn => this.setState({envoyerMail:isOn})}
                />
               </View>
           </View>

           <TouchableOpacity style={styles.buttonContainer} onPress={this.sendData.bind(this)} >
             
             <Text style={styles.btnTextStyle}>Confirmer</Text>

           </TouchableOpacity>
        
        
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
  imageContainer:{
    flexDirection:'row',
    alignItems:'center'
  }
  ,
  imageStyle:{
    alignSelf:'flex-end',
    height:150,
    width:100,
  }
  ,
  titlesubContainerStyle:{
      flex:1,
      paddingLeft:20,
  }
  ,
  titleStyle:{
    fontSize:16,
    fontWeight:'bold'
  }
  
  ,
  PublicitesStyleContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
  ,
  pickerContainer:{
    backgroundColor : "rgb(237,237,237)",
    justifyContent  : "center",
    width:160,
    borderRadius:10,
    height:30,
    marginTop:10
  }
  ,
  togglesContainer:{
    alignItems:'center',
    margin:30,
    height:100,
  }
  ,
  buttonContainer:{
    backgroundColor:'#1F3792',
    marginRight:40,
    alignSelf:'flex-end',
    width:100,
    borderRadius:10,
    height:35,
  }
  ,
  btnTextStyle:{
    color:'white',
    fontSize:13,
    padding:9,
    alignSelf:'center',
    fontWeight:'bold'
  }
})


export default typedattestation;

