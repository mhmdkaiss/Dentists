import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Image
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';

function CustomHeader(props) {
  const toggleDrawer = () =>
    props.navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={toggleDrawer}
            style={styles.leftButton}
            testID="CustomHeader-toggleDrawer">
              
            <Image
            
            source={require('../../assets/menu.png')}
            style={styles.logo}
            
          />
          </TouchableOpacity>
        </View>
        <View onPress={()=>this.props.navigation.navigate("Home")}  style={styles.header}>
          <Text onPress={()=>props.navigation.navigate("Home")} style={styles.headerTxt}>{props.title}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#222222',
    minHeight: 60,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  leftButton: {
    marginLeft: 10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 60,
  },
  buttonTxt: {
    color: '#ddd',
    fontWeight: 'bold',
  },
  headerTxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',

  },
  logo: {
    width: 20,
    height: 20,
  },
});

export default CustomHeader;

