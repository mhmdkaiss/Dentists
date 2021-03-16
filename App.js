import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationForm from './pages/HomeScreen';
import Publicites from './pages/LocationsScreen';
import secondTab from './pages/HeartPage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;

                  if (route.name === 'Home') {
                    iconName = focused ? 'search' : 'search';
                    return <Feather name={iconName} size={size} color={color} />;
                  } else if (route.name === 'Settings') {
                    iconName = focused ? 'heartbeat' : 'heartbeat';
                    return <FontAwesome name={iconName} size={size} color={color} />;
                  }else if (route.name === 'Locations') {
                    iconName = focused ? 'location-pin' : 'location-pin';
                    return <Entypo name={iconName} size={32} color={color} />;
                  }

                  // You can return any component that you like here!
              
                },
              })}
              tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
                showLabel:false,
              }} 
             >
        <Tab.Screen name="Home" component={RegistrationForm} />
        <Tab.Screen name="Settings" component={secondTab} />
        <Tab.Screen name="Locations" component={Publicites} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}