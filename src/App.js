import React, {useEffect,useState} from 'react'
import {Text,ActivityIndicator,View,StyleSheet} from 'react-native'
import 'react-native-gesture-handler';

//import auth from '@react-native-firebase/auth'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, connect} from 'react-redux'

import Onboarding from './screens/OnboardingScreen';
import AddPost from './screens/AddPost';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
//import AdvancedApp from "./advanced/AdvancedApp";
import AuthStack from "./AuthStack";
//import Home from './screens/Home';
import CustomHeader from './layout/CustomHeader';

import {SET_USER, IS_AUTHTHENTICATED,STORAGE_KEY_ONBOARDINGSCREEN} from './action/action.types';

//import database from '@react-native-firebase/database'
import EmptyContainer from './componenets/EmptyContainer';
import {requestPermission} from './utils/AskPermission';
import auth from './reducer/auth';


const Stack = createNativeStackNavigator();

const App =({authState}) => {

  const dispatch = useDispatch();
  const [Buffer, setBuffer] = useState(false);
  const [loading, setloading] = useState(0);
  const [route, setroute] = useState(null);
  const [logins, setlogins] = useState(null);
  const [onboardings, setonboardings] = useState(null);


  const getData = async () => {
    try {
      const hello = await AsyncStorage.getItem('storage_Key_OnboardingScreen');
      const hello1 = await AsyncStorage.getItem('storage_Key_Login');
      setonboardings(hello);
      setlogins(hello1);
      console.log("ohhhh",hello,hello1);
      setloading(1);
      

      if(hello){
        dispatch({
          type: STORAGE_KEY_ONBOARDINGSCREEN,
          payload: true
        })
        console.log("hello");
        setBuffer(!(Onboarding_credential));
        console.log("Datao",authState.storage_Key_OnboardingScreen);
      }

      if(hello1){
        dispatch({
          type: IS_AUTHTHENTICATED,
          payload: true
        })
        console.log("hello1");
      } 

  
      console.log("setroute",route);
      
    } catch(e) {
      // error reading value
    }
  }

  const onAuthStateChanged = (user) => {
    if (user) {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: true
      })



      console.log(user._user.uid)

      // database()
      //   .ref(`/users/${user._user.uid}`)
      //   .on('value', (snapshot) => {
      //     console.log('USER DETAILS', snapshot.val())
      //     dispatch({
      //       type: SET_USER,
      //       payload: snapshot.val(),
      //     })
      //   })


    } else {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: false
      })
    }
  }

  useEffect(() => {
    //requestPermission()
    getData()
    // const susbcriber = auth().onAuthStateChanged(onAuthStateChanged)
    // return susbcriber;
    console.log("Datao",authState.storage_Key_OnboardingScreen);
    console.log("puuuuuuuuuuu",onboardings,logins);
    
  }, [])

  if (!loading)
  {
     return(
        <View style={style.spinner}>
           <ActivityIndicator size="large" color="'#22B5BC" />
        </View>
     )
  }else{
    if(onboardings && logins=="Login"){
      return(
       <NavigationContainer>
             <AuthStack routeName="Drawerhome"/>
       </NavigationContainer>
      )
 }else if(onboardings){
   return(
     <NavigationContainer>
           <AuthStack routeName="SignIn"/>
     </NavigationContainer>
    )
 }else{
    return(
     <NavigationContainer>
           <AuthStack routeName="Onboarding"/>
     </NavigationContainer>
    )
 // }{

 //   return(
       
 //       <>
 //       <NavigationContainer>
 //         <Stack.Navigator initialRouteName={route}>
 //             <Stack.Screen name="Onboarding" component={Onboarding} options={{header:()=>null}}/>
 //             <Stack.Screen name="SignIn" component={SignIn} options={{
 //                                 title: 'Login',
 //                                 headerStyle: {
 //                                   backgroundColor: '#800080',
 //                                 },
 //                                 headerTintColor: '#fff',
 //                                 headerTitleStyle: {
 //                                   fontWeight: 'bold',
 //                                 },
 //                               }}
 //             />
 //             <Stack.Screen name="Home" component={Home} />
 //             <Stack.Screen name="AddPost" component={AddPost} />
 //         </Stack.Navigator>
 //       </NavigationContainer>
 //       </>  
       
 //   )
 // }
}
  }
  
  
}

const mapStateToProps = (state) => ({
  authState: state.auth
})

export default connect(mapStateToProps)(App)

const style=StyleSheet.create({
    spinner:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
      },
})