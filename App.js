import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationForm from './pages/SignUp';
import Publicites from './pages/LocationsScreen';
import secondTab from './pages/HeartPage';
import SignIn from './pages/Signin';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ForgotPassword from './pages/ForgotPassword';
import DrCharfi from './pages/DrCharfi';
import typedattestation from './pages/typedattestation';
import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="typedattestation" component={typedattestation} options={{headerShown: false}}/>
      <HomeStack.Screen name="DrCharfi" component={DrCharfi} options={{headerShown: false}}/>
      <HomeStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
      <HomeStack.Screen name="SignUp" component={RegistrationForm} options={{headerShown: false}}/>
      <HomeStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
    </HomeStack.Navigator>
  );
}


class App extends React.Component {

  state = {loggedIn:null}

  componentWillMount(){
        
      const {loggedIn} = this.state;

        // auth().createUserWithEmailAndPassword('jane.doe@example.com', '12345678');
        auth().signInWithEmailAndPassword('testt@test.com','12345678')

      //   auth().onAuthStateChanged((user)=>{
      //   if(user){
      //     // console.log(user);
      //     // console.log(user);
      //   } else {
      //     //  console.log(user);
      //     console.log('user not logged');
      //   }
      // })
    }

  render(){
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
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Settings" component={secondTab} />
          <Tab.Screen name="Locations" component={Publicites} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
  

export default App;