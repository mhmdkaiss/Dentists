import 'react-native-gesture-handler';
import React , {Component}from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {drawerItemsMain} from './drawerItemsMain';
import CustomDrawerContent from './CustomDrawerContent.js';
import CustomHeader from './CustomHeader';
//import Camera from '../Camera/Cameras'
import Dashboard from '../Dashbord/Dashboard'

const Drawer = createDrawerNavigator();
function MainDrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
      )}>
      <Drawer.Screen name="Home" component={Dashboard} />


    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

class App extends Component {
  componentDidMount(){
    console.log("hello")
  }
render(){
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerMode: 'screen',
          
          headerTintColor: '#DCDCDC',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          header: (props) => {
            return <CustomHeader {...props} title='Dentist' />;
          },
        }}>
        <Stack.Screen name="MainDrawer" component={MainDrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00FF00',
  },
});

export default App;