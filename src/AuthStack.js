import React,{useState,useEffect,useContext} from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/OnboardingScreen';
import AddPost from './screens/AddPost';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import Drawerhome from './screens/Drawerhome';
import LocationPage from './screens/LocationPage';
import Home from './screens/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
import DrawerContent from "../src/DrawerContent";
//import Drawerhome from './screens/Drawerhome';

const AuthStack=({routeName})=> {

  const [isFirstLaunch, setIsFirstLunch] = useState(0);

  return (

      // <Drawer.Navigator initialRouteName={routeName}>
      //   <Drawer.Screen name="Onboarding" component={Onboarding} options={{header:()=>null}}/>
      //    <Drawer.Screen name="SignIn" component={SignIn} options={{
      //                              title: 'Login',
      //                              headerStyle: {
      //                                backgroundColor: '#800080',
      //                             },
      //                             headerTintColor: '#fff',
      //                             headerTitleStyle: {
      //                               fontWeight: 'bold',
      //                             },
      //                           }}
      //   />
      //   <Drawer.Screen name="Drawerhome" component={Drawerhome} />
      //    <Drawer.Screen name="AddPost" component={AddPost} />
      //   {/* <Drawer.Screen name="Home" component={HomeScreen} />
      //   <Drawer.Screen name="Notifications" 
      //                 component={NotificationsScreen} />
      //   <Drawer.Screen name="About" component={AboutScreen} /> */}
      // </Drawer.Navigator>
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{header:()=>null}}/>
        <Stack.Screen name="SignIn" component={SignIn} options={{
                                  title: 'Login',
                                  headerStyle: {
                                    backgroundColor: '#800080',
                                  },
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {
                                    fontWeight: 'bold',
                                  },
                                }}
        />
        {/* <Stack.Screen name="Home" component={Home} options={{
                                  title: 'Home',
                                  headerStyle: {
                                    backgroundColor: '#800080',
                                  },
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {
                                    fontWeight: 'bold',
                                  },
                                }}
        /> */}
        <Stack.Screen name="Profile" component={Profile} />

        <Stack.Screen name="LocationPage" component={LocationPage} />

        <Stack.Screen name="Drawerhome" component={Drawerhome} options={{header:()=>null}}/>
        
      </Stack.Navigator>
  );
}

export default AuthStack;