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
import ForgotPassword from './pages/ForgotPassword';
import DrCharfi from './pages/DrCharfi';
import typedattestation from './pages/typedattestation';
import auth from '@react-native-firebase/auth';
import ActualitePage from './pages/ActualitePage';
import DocumentsPage from './pages/DocumentsPage';
import repartition from './pages/Repartition';
import ViewAttestation from './pages/ViewAttestation';
import Notifications from './pages/Notifications';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen(props) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="DrCharfi" component={DrCharfi} options={{headerShown: false}}/>
      <HomeStack.Screen name="typedattestation" component={typedattestation}  options={{headerTitle: null}}/>
      <HomeStack.Screen name="NotificationsPage" component={Notifications} options={{headerTitle: null}}/>
      <HomeStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
    </HomeStack.Navigator>
  );
}

function HeartStackScreen() {
  return (
    <HomeStack.Navigator>

      <HomeStack.Screen name="HeartPage" component={HeartPage} options={{headerShown: false}}/>
      <HomeStack.Screen name="ActualitePage" component={ActualitePage} options={{headerTitle: null}}/>
      <HomeStack.Screen name="DocumentsPage" component={DocumentsPage} options={{headerTitle: null}}/>
      <HomeStack.Screen name="RepartitionPage" component={repartition} options={{headerTitle: null}}/>
      <HomeStack.Screen name="ViewAttestationPage" component={ViewAttestation} options={{headerTitle: null}}/>
    </HomeStack.Navigator>
  );
}

function WhenNotSignedIn(){
  return(
    <HomeStack.Navigator>
    <HomeStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />  
    <HomeStack.Screen name="SignUp" component={RegistrationForm} options={{headerShown: false}}/>
    <HomeStack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
    <HomeStack.Screen name="DrCharfi" component={DrCharfi} options={{headerShown: false}}/>
  </HomeStack.Navigator>
  )
}


class App extends React.Component{

  state={loggedIn:false};

  componentWillMount(){

    //admob for publicities
    admob()
  .setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want your content treated as child-directed for purposes of COPPA.
    tagForChildDirectedTreatment: true,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,
  })
  .then(() => {
    // Request config successfully set!
  });


  //check if user logged in or not
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
            <Tab.Screen name="Home" component={WhenNotSignedIn} />
            <Tab.Screen name="Settings" component={repartition} />
            <Tab.Screen name="Locations" component={Publicites} />
          </Tab.Navigator>
         
        </NavigationContainer>
      );
    }
    
  }
}
  

export default App;