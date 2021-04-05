// #3 Uploading Files and Images to Firebase Cloud Storage in React Native
// https://aboutreact.com/react-native-firebase-cloud-storage/

// Import React in our code
import React, { useState, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

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


const DocumentsPage = () => {
  // State Defination
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh,setrefresh] =useState(false);

  useEffect(() => {
    listFilesAndDirectories("");
  }, []);

  const listFilesAndDirectories = (pageToken) => {
    setrefresh(true);
    const reference = storage().ref("pdfs");
    reference.list({ pageToken }).then((result) => {
      result.items.forEach((ref) => {
        console.log(ref.fullPath);
      });

      if (result.nextPageToken) {
        return listFilesAndDirectories(
          reference,
          result.nextPageToken
        );
      }
      setListData(result.items);
      setLoading(false);
      setrefresh(false);
      
    });
    console.log(listData);
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
      .catch((e) => {
        console.error(e);
      });
    Linking.openURL(url);
    console.log(url);
  };

  return (
    <SafeAreaView style={styles.container}>
     <Header Label={'Documents'}/>
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

export default DocumentsPage;

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