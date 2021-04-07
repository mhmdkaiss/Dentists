import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationForm from './pages/SignUp';
import Publicites from './pages/PublicitiesScreen';
import HeartPage from './pages/HeartPage';
import SignIn from './pages/Signin';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ForgotPassword from './pages/ForgotPassword';
import DrCharfi from './pages/DrCharfi';
import typedattestation from './pages/typedattestation';
import auth from '@react-native-firebase/auth';
import ActualitePage from './pages/ActualitePage';
import DocumentsPage from './pages/DocumentsPage';
import repartition from './pages/Repartition';
import ViewAttestation from './pages/ViewAttestation';
import Notifications from './pages/Notifications';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="DrCharfi" component={DrCharfi} options={{headerShown: false}}/>
      <HomeStack.Screen name="typedattestation" component={typedattestation} options={{headerShown: false}}/>
      <HomeStack.Screen name="NotificationsPage" component={Notifications} options={{headerShown: false}}/>
      <HomeStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
    </HomeStack.Navigator>
  );
}

function HeartStackScreen() {
  return (
    <HomeStack.Navigator>

      <HomeStack.Screen name="HeartPage" component={HeartPage} options={{headerShown: false}}/>
      <HomeStack.Screen name="ActualitePage" component={ActualitePage} options={{headerShown: false}}/>
      <HomeStack.Screen name="DocumentsPage" component={DocumentsPage} options={{headerShown: false}}/>
      <HomeStack.Screen name="RepartitionPage" component={repartition} options={{headerShown: false}}/>
      <HomeStack.Screen name="ViewAttestationPage" component={ViewAttestation} options={{headerShown: false}}/>
    </HomeStack.Navigator>
  );
}


class App extends React.Component{

  state={loggedIn:false};

  componentWillMount(){
    auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({loggedIn:true});
      } else {
        this.setState({loggedIn:false});
      }
    })
  }

  render(){
    const {loggedIn} = this.state;
    if(loggedIn){
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
                        iconName = focused ? 'shopping-cart' : 'shopping-cart';
                        return <FontAwesome name={iconName} size={30} color={color} />;
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
            <Tab.Screen name="Settings" component={HeartStackScreen} />
            <Tab.Screen name="Locations" component={Publicites} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    }
    else {
      return (
        <NavigationContainer>
          <HomeStack.Navigator>
            <HomeStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />  
            <HomeStack.Screen name="SignUp" component={RegistrationForm} options={{headerShown: false}}/>
            <HomeStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
            <HomeStack.Screen name="DrCharfi" component={DrCharfi} options={{headerShown: false}}/>
          </HomeStack.Navigator>
        </NavigationContainer>
      );
    }
    
  }
}
  

export default App;