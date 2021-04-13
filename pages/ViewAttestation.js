import React, { useState, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Linking,
  TouchableOpacity,
  RefreshControl
} from "react-native";

import storage from "@react-native-firebase/storage";
import Header from "../components/header";


const ViewAttestation = () => {
  // State Defination
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh,setrefresh] =useState(false);

  const [currentUserEmail,setcurrentUserEmail] =useState('');

  useEffect(() => {
    listFilesAndDirectories("");
  }, [currentUserEmail]);

  const listFilesAndDirectories = (pageToken) => {
      
    const email = auth().currentUser.email // numero + @france.com
    const emaillength=email.length;   
    const numeroSize = emaillength - 11;
    const numero = email.slice(0,numeroSize);

    firestore()
      .collection('Dentists')
      .doc(numero)
      .onSnapshot(documentSnapshot => {
        setcurrentUserEmail(documentSnapshot.data().email);
      });


      if(currentUserEmail){
            setrefresh(true);
            storage().ref(`Attestations/${currentUserEmail}`).list({ pageToken }).then((result) => {
    
            setListData(result.items);  

            setLoading(false);
            setrefresh(false);   
            });
        }
  };

  const ItemView = ({ item }) => {
    return (
      // FlatList Item
      <View style={{ padding: 10 }}>
        
        <TouchableOpacity style={styles.telechargeBtn} onPress={() => getItem(item.fullPath)}>
            <Text
                style={styles.itemname}
            >
                 File Name: {item.name}
            </Text>
            <Ionicons name={'cloud-download'} style={styles.iconStyle} size={22}/>
           
        </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = async (fullPath) => {
    const url = await storage()
      .ref(fullPath)
      .getDownloadURL()
      
    Linking.openURL(url);
  };


  return (
    <SafeAreaView style={styles.container}>
    
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={listData}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={listFilesAndDirectories}/>}
        />
      )}
    
    </SafeAreaView>
  );
};

export default ViewAttestation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
  },
  telechargeBtn:{
      flexDirection:'row',
      
  },
  iconStyle:{
      padding:4,
  },
  itemname:{
      fontSize:16,
      flex:1,
  }
});