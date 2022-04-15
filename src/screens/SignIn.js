import React, {useState} from 'react'
import {StyleSheet, ScrollView, Image, TouchableOpacity,ImageBackground,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Container,
    Form,
    Item,
    Input,
    Text,
    Button,
    H3,
    View,
} from 'native-base'

import Welcome from '../assets/undraw_welcome_cats_thqn.png'


import {connect} from 'react-redux'
import {signIn} from '../action/auth'
import propTypes from 'prop-types'

import FormInput from "../componenets/FormInput";
import FormButton from "../componenets/FormButton";
import SocialButton from "../componenets/SocialButton";
import FormPassword from "../componenets/FormPassword";
import { windowHeight } from "../utils/Dimension";
import Logo from "../assets/logo.png";
import fblogin from "../assets/fblogin.png";
import appbg from "../assets/appbg.png";
import anew from "../assets/anew1.jpg";
import Axios from 'axios';
import Logo1 from "../assets/blogo.png";
import {Header} from "react-native-elements";
import Snackbar from 'react-native-snackbar';

const SignIn = ({navigation, signIn}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setloading] = useState(1);

    const doSignIn = () => {
      try {
        console.log("fun");
        setloading(0);
        console.log(email,password);
        Axios.post('http://192.168.56.1:5000/api/auth/signin', {
          userid: email,
          password: password
        }).then(function (response) {
          console.log(response);
          if(response.data.status=="success"){
            signIn({email, password})
            const re=response.data;
            console.log("data",response.data);
            storeData(re.email,re.userid,re.firstname,re.lastname,re.employeerole,re.phonenumber,re.employeeipath)
            setloading(1);
            console.log("vivekmap",email,password);
          }
    })
    .catch(function (error) {
          console.log(error);
    });

        // const response = Axios.get('http://192.168.56.1:5000/api/test/alluser')

        //console.log(response);
        
      } catch (error) {
        console.error(error);
      }
          // .then(function (response) {
          //       console.log(response);
          //       if(response.data.status=="success"){
          //         //signIn({email, password})
          //         console.log("data",response.data.data);
          //         setloading(1);
          //         navigation.replace("Home", {
          //           ilstatus:true
          //         })
          //         console.log("vivekmap",email,password);
          //         //storeData(email)
          //       }
          // })
          // .catch(function (error) {
          //       console.log("error");
          // });

    }

    const storeData = async (email,userid,firstname,lastname,employeerole,phonenumber,employeeipath) => {
      try {
        const storage_Key='Login'
        await AsyncStorage.setItem('storage_Key_Login', storage_Key);
        await AsyncStorage.setItem('userids', userid);
        await AsyncStorage.setItem('firstname', firstname);
        await AsyncStorage.setItem('lastname', lastname);
        await AsyncStorage.setItem('employeerole', employeerole);
        await AsyncStorage.setItem('emails', email);
        await AsyncStorage.setItem('phonenumber', phonenumber);
        await AsyncStorage.setItem('employeeipath', employeeipath);
        //setloading(1);
        console.log("ooooooo");
        navigation.replace("Drawerhome")
      } catch (e) {
        console.log(e);
      }
    }


    if (!loading)
  {
     return(
       <>
        <View style={styles.spinner}>
           <ActivityIndicator size="large" color="'#22B5BC" />
        </View>
        </>
     )
  }else{
    return (
        <Container style={styles.container}>
          <ImageBackground source={appbg} style={styles.image}> 
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.containers}>
            <H3 style={styles.heading}>Welcome to Office</H3>
    
            <Image
              source={Welcome}
              style={{width: null, height: 150, marginTop: 30}}
              resizeMode="contain"
            />

              <FormInput
                  labelValue={email}
                  onChangeText={(userEmail) => setEmail(userEmail)}
                  placeholderText="Userid"
                  iconType="email"
                  //keyboardType="text"
                  autoCapitalize="none"
                  autoCorrect={false}
              />

              <FormPassword
                  labelValue={password}
                  onChangeText={(userPassword) => setPassword(userPassword)}
                  placeholderText="Password"
                  iconType="lock"
              />     
              
              <FormButton
                  buttonTitle="Login"
                  onPress={doSignIn}
              />

              <View style={{justifyContent: 'center',alignItems: 'center',marginTop:110}}>
                <Image
                  style={styles.logo}
                  source={Logo1}
                />
              </View>
    
            {/* <Form>
              <Item rounded style={styles.formItem}>
                <Input
                  placeholder="enter your registerd email"
                  value={email}
                  style={{color: '#eee'}}
                  onChangeText={(text) => setEmail(text)}
                />
              </Item>
              <Item rounded style={styles.formItem}>
                <Input
                  placeholder="enter your registerd password"
                  value={password}
                  secureTextEntry={true}
                  style={{color: '#eee'}}
                  onChangeText={(text) => setPassword(text)}
                />
              </Item>
              <Button rounded block onPress={doSignIn}>
                <Text>SignIn</Text>
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={{marginTop: 10}}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Do not have an account, SignUp here
                </Text>
              </TouchableOpacity>
            </Form> */}
             </View>
          </ScrollView>
          </ImageBackground>
        </Container>
      );
          }
}

const mapDispatchToProps = {
    signIn: (data) => signIn(data)
}

SignIn.propTypes = {
    signIn: propTypes.func.isRequired
}


export default connect(null, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
    container: {
      //backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#800080',
      marginHorizontal: 5,
      marginTop: 30,
    },
    formItem: {
      marginBottom: 20,
    },
    containers: {
      margin:10
    },
    logo:{
      width:100,
      height:100,
      //marginTop:30
    },
    spinner:{
      flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: "white",
     },
  });
  