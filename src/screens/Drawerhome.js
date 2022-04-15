import React,{useState,useEffect,useContext} from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from "../DrawerContent";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
//import DrawerContent from "../src/DrawerContent";

const Drawerhome=({navigation})=> {

    useEffect(() => {
        console.log("Drawerhome");
    }, []);

  const [isFirstLaunch, setIsFirstLunch] = useState(0);

  return (
 // {console.log("home");}
      <Drawer.Navigator initialRouteName="Home" drawerContent={props=> <DrawerContent {...props}/>} >
        {/* <Drawer.Screen name="Onboarding" component={Onboarding} options={{header:()=>null}}/>
         <Drawer.Screen name="SignIn" component={SignIn} options={{
                                   title: 'Login',
                                   headerStyle: {
                                     backgroundColor: '#800080',
                                  },
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {
                                    fontWeight: 'bold',
                                  },
                                }}
        /> */}
        <Drawer.Screen name="Home" component={Home} />
         {/* <Drawer.Screen name="AddPost" component={AddPost} /> */}
        {/* <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" 
                      component={NotificationsScreen} />
        <Drawer.Screen name="About" component={AboutScreen} /> */}
      </Drawer.Navigator>
      // <Stack.Navigator initialRouteName={routeName}>
      //   <Stack.Screen name="Onboarding" component={Onboarding} options={{header:()=>null}}/>
      //   <Stack.Screen name="SignIn" component={SignIn} options={{
      //                             title: 'Login',
      //                             headerStyle: {
      //                               backgroundColor: '#800080',
      //                             },
      //                             headerTintColor: '#fff',
      //                             headerTitleStyle: {
      //                               fontWeight: 'bold',
      //                             },
      //                           }}
      //   />
      //   <Stack.Screen name="Home" component={Home} />
      //   <Stack.Screen name="AddPost" component={AddPost} />
      // </Stack.Navigator>
  );
}

export default Drawerhome;