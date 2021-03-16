import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationForm from './pages/HomeScreen';
import Feather from 'react-native-vector-icons/Feather';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

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
      <Text>Settings!</Text>
    </View>
  );
}

function LocationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Locations!</Text>
      <Feather name="activity" style={{fontSize:50}}/>
    </View>
  );
}

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
                    return <FontAwsome name={iconName} size={size} color={color} />;
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
              }} 
             >
        <Tab.Screen name="Home" component={RegistrationForm} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Locations" component={LocationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}