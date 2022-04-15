import React,{useEffect} from "react";
import {
    Text,
    View,
    Image,
    Button,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {storageKeyOnboardingScreen} from '../action/auth'

const OnboardingScreen= ({navigation,storageKeyOnboardingScreen}) => {

  useEffect(() => {
    storeData();
    const rna="vivek"
    storageKeyOnboardingScreen({rna})
  }, []);

  const storeData = async () => {
    try {
      // const storage_Key='true';
      // await AsyncStorage.setItem('storage_Key_OnboardingScreen', storage_Key);
    } catch (e) {
      console.log(e);
    }
  }

  const skip=({...props})=>(
    <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}>
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
  )

  const Next=({...props})=>(
    <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}>
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
  )

  const Done=({...props})=>(
    <TouchableOpacity
      style={{marginHorizontal:10}}
      {...props}>
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
  )

  const Dots=({selected})=>{
    let backgroundColor;

    backgroundColor=selected?"rgba(0,0,0,0.8)":"rgba(0,0,0,0.3)";

    return(
          <View style={{width:5,height:5,marginHorizontal:3,backgroundColor}}/>
    );

  }

     return(
        <Onboarding
        SkipButtonComponent={skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={()=>navigation.replace("SignIn")}
        onDone={()=>navigation.navigate("SignIn")}
        pages={[
          {
            backgroundColor: '#FFFFFF',
            image: <Image source={require("../assets/OnboardingEmployee1.png")} style={styles.forimage}/>,
            title: 'TRACK EMPLOYEES',
            subtitle: 'TRACK EMPLOYEES',
          },
          {
            backgroundColor: '#FFFFFF',
            image: <Image source={require('../assets/OnboardingEmployee3.png')} style={styles.forimage2}/>,
            title: 'GPS TRACKING',
            subtitle: 'GPS TRACKING',
          },
          {
            backgroundColor: '#FFFFFF',
            image: <Image source={require('../assets/OnboardingEmployee2.png')} style={styles.forimage3}/>,
            title: 'IMAGE CAPTURE',
            subtitle: 'IMAGE CAPTURE',
          },
        ]}
      />
     );
};

const mapDispatchToProps = {
  storageKeyOnboardingScreen: (data) => storageKeyOnboardingScreen(data)
}

OnboardingScreen.propTypes = {
  storageKeyOnboardingScreen: propTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(OnboardingScreen);

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:'center',
    },
    forimage:{
      height:350,
      width:350,
    },
    forimage2:{
      height:350,
      width:400,
    },
    forimage3:{
      height:350,
      width:350,
    }
});