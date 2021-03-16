import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationForm from './pages/HomeScreen';
import {Ionicons,Entypo} from 'react-native-vector-icons/Ionicons';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text> <Text>Settings!</Text>
      <Text>Settings!</Text>
      <Text>Settings!</Text>
      <Text>Settings!</Text>
      <Text>Settings!</Text> <Text>Settings!</Text>
      <Text>Settings!</Text>
      <Text>Settings!</Text>
      <Text>Settings!</Text>
    </View>
  );
}

function LocationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Locations!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
             >
        <Tab.Screen name="Home" component={RegistrationForm} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Locations" component={LocationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}