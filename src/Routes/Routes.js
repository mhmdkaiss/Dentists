import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import LoginScreen from '../login/login'
import Home from '../MenuDentist/Home'
import HomeG from '../Menugestionnaires/gestionaire'

export default  Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene type="replace" key = "Login" component = {LoginScreen} title = "Login" initial = {true} hideNavBar />
         <Scene  key = "Home" component = {Home}  hideNavBar  />
         <Scene  key = "HomeG" component = {HomeG}  hideNavBar />
      </Scene>
   </Router>
)
