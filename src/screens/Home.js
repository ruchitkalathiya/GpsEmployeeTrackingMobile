import React, {useState,useEffect} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Button,
  PermissionsAndroid,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';

import MapView from 'react-native-maps';

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import Icon1 from "react-native-vector-icons/Ionicons";

import Geolocation from '@react-native-community/geolocation';

import GetLocation from 'react-native-get-location';
import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({navigation}) => {
  const [filePath, setFilePath] = useState({});
  const [userids, setUserids] = useState(0);
  const [loading, setloading] = useState(1);
 // const {ilstatus}=route.params;

  const [ilstatuss, setilstatuss] = useState(true);

  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

   useEffect(() => {
     // captureImage('photo');   
      // const requestLocationPermission = async () => {
      //   if (Platform.OS === 'ios') {
      //     getOneTimeLocation();
      //     subscribeLocationLocation();
      //   } else {
      //     try {
      //       const granted = await PermissionsAndroid.request(
      //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      //         {
      //           title: 'Location Access Required',
      //           message: 'This App needs to Access your location',
      //         },
      //       );
      //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //         console.log("permission");
      //         //To Check, If Permission is granted
      //         getOneTimeLocation();
      //         subscribeLocationLocation();
      //       } else {
      //         setLocationStatus('Permission Denied');
      //       }
      //     } catch (err) {
      //       console.warn(err);
      //     }
      //   }
      // };
      // requestLocationPermission();
      // return () => {
      //   Geolocation.clearWatch(watchID);
      // };
      if(ilstatuss){
        setloading(0);
        
        getData();

      }
      }, [])

      const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            setLocationStatus('You are Here');
            console.log('You are Here');
    
            //getting the Longitude from the location json
            const currentLongitude = 
              JSON.stringify(position.coords.longitude);
    
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
    
            //Setting Longitude state
            setCurrentLongitude(currentLongitude);
            
            //Setting Longitude state
            setCurrentLatitude(currentLatitude);
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 1000
          },
        );
      };

      const getData =  async() => {
        captureImage('photo');
        try {
          var value1 =  await AsyncStorage.getItem('storage_Key_Login')
          var value2 =  await AsyncStorage.getItem('userids')
          // var value3 = await AsyncStorage.getItem('firstname')
          // var value4 = await AsyncStorage.getItem('lastname')
          // var value5 = await AsyncStorage.getItem('employeerole');
          // var value6 = await AsyncStorage.getItem('emails')
          // var value7 = await AsyncStorage.getItem('phonenumber')
          // var value8 = await AsyncStorage.getItem('employeeipath')
          // console.log(value1,value2,value3,value4,value5,value6,value7,value8);
          // console.log(hi);
          // setname(value3);
          // setemail(value4);
          // setphonenumber(value5);
          setUserids(value2);
          // seturl(value8);
          // // console.log(value3);
          // // console.log(value4);
          console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHlllllllllllllllllllllllllllllllllll");

          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          })
          .then(location => {
              //getData();
              console.log(location);
              setCurrentLatitude(location.latitude);
              setCurrentLongitude(location.longitude);
              let latitude=(location.latitude).toString;
              let longitude=(location.longitude).toString
              setilstatuss(false)
        //       Axios.post('http://192.168.56.1:5000/api/auth/forlocationtables', {
        //         userid:"vivek007",
        //         employeelatitute:(location.latitude).toLocaleString(),
        //         employeelongitute: (location.longitude.toLocaleString())
        // }).then(function (response) {
        //   console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLllLL",response);
        //   // if(response.data.status=="success"){
        //   //   signIn({email, password})
        //   //   const re=response.data;
        //   //   console.log("data",response.data);
        //   //   storeData(re.email,re.userid,re.firstname,re.lastname,re.employeerole,re.phonenumber,re.employeeipath)
        //   //   setloading(1);
        //   //   console.log("vivekmap",email,password);
        //   // }
        // })
        // .catch(function (error) {
        //       console.log(error);
        // });
          })
          .catch(error => {
              const { code, message } = error;
              console.warn(code, message);
          })
        } catch(e) {
          Alert.alert(e);
        }
    }
      const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
          (position) => {
            //Will give you the location on location change
            
            setLocationStatus('You are Here');
            console.log(position);
    
            //getting the Longitude from the location json        
            const currentLongitude =
              JSON.stringify(position.coords.longitude);
    
            //getting the Latitude from the location json
            const currentLatitude = 
              JSON.stringify(position.coords.latitude);
    
            //Setting Longitude state
            setCurrentLongitude(currentLongitude);
    
            //Setting Latitude state
            setCurrentLatitude(currentLatitude);
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 1000
          },
        );
      };


  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let imagepath;
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.assets[0]);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.assets[0].height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);

        let source = response;
        //setFilePath({profileImage: source});
        setFilePath(response.assets[0]);
        setloading(1);
        alert('Your Data is send');
        //chooseFile()
        // imagepath=response;
      
        // let data = new FormData();
        //   data.append("userid", "vivek007");
        //   data.append("fileData", {
        //     employeeipath : imagepath.assets[0].uri,
        //     employeeitype: imagepath.assets[0].type,
        //     employeeiname: imagepath.assets[0].fileName
        //   });
        //   console.log(JSON.stringify(data));
        // Axios.post('http://192.168.56.1:5000/api/auth/forlocationtables',data).then(function (response) {
        //   console.log("iamge",response.data);
        //   // if(response.data.status=="success"){
        //   //   signIn({email, password})
        //   //   const re=response.data;
        //   //   console.log("data",response.data);
        //   //   storeData(re.email,re.userid,re.firstname,re.lastname,re.employeerole,re.phonenumber,re.employeeipath)
        //   //   setloading(1);
        //   //   console.log("vivekmap",email,password);
        //   // }
        // })
        // .catch(function (error) {
        //       console.log(error);
        // });

      });
      //console.log("dddddddddddddddddddddd",filePath);
      
      
    }
  };

  const removeValue = async () => {
    try {
      let imagepath;
      let options = {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        videoQuality: 'low',
        durationLimit: 30, //Video max duration in seconds
        saveToPhotos: true,
      };
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      if (isCameraPermitted && isStoragePermitted) {
        launchCamera(options, (response) => {
          console.log('Response = ', response);
  
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.assets[0]);
          console.log('uri -> ', response.assets[0].uri);
          console.log('width -> ', response.assets[0].width);
          console.log('height -> ', response.assets[0].height);
          console.log('fileSize -> ', response.assets[0].fileSize);
          console.log('type -> ', response.assets[0].type);
          console.log('fileName -> ', response.assets[0].fileName);
  
          let source = response;
          //setFilePath({profileImage: source});
          setFilePath(response.assets[0]);
           AsyncStorage.removeItem('storage_Key_Login')
           AsyncStorage.removeItem('userids')
           AsyncStorage.removeItem('firstname')
           AsyncStorage.removeItem('lastname')
           AsyncStorage.removeItem('employeerole')
           AsyncStorage.removeItem('phonenumber')
           AsyncStorage.removeItem('employeeipath')
           AsyncStorage.removeItem('emails')
            //setloading(1);
            console.log("ooooooo");
            navigation.replace("SignIn")
          setloading(1);
          alert('Your Data is send');
        }
        )}
    } catch (error) {
      
    }
   
  }

  const chooseFile = () => {
    let {profileImage} = filePath;
    // initilizing form data
    
          let formData = new FormData();
          formData.append("userid", "vivek007"),
          formData.append('fileData', {
                 
                  employeeipath: profileImage.uri,
                  employeeitype: 'image/jpeg/jpg',
                  employeeiname: profileImage.fileName,
                  //data: profileImage.data,
                });
    
          // Axios.post('http://192.168.56.1:5000/api/auth/forimages',formData)
          // .then(function (response) {
          //   console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",response);
          //   setloading(1)
          //   // if(response.data.status=="success"){
          //   //   signIn({email, password})
          //   //   const re=response.data;
          //   //   console.log("data",response.data);
          //   //   storeData(re.email,re.userid,re.firstname,re.lastname,re.employeerole,re.phonenumber,re.employeeipath)
          //   //   setloading(1);
          //   //   console.log("vivekmap",email,password);
          //   // }
          // })
          // .catch(function (error) {
          //       console.log(error);
          // });
  };

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
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
      {/* <Text style={styles.titleText}>
        Example of Image Picker in React Native
      </Text> */}
      <View style={styles.container}>
        {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> */}
        <Image
          source={{uri: filePath.uri}}
          style={styles.imageStyle}
        />
        <TouchableOpacity  onPress={() => navigation.navigate('LocationPage')}>
        <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 100, height: 100}}
          />
          </TouchableOpacity>
          <Text style={styles.boldText}>
            {locationStatus}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              color:"#000000"
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              marginBottom:16,
              color:"#000000"
            }}>
            Latitude: {currentLatitude}
          </Text>
          <View style={{marginTop: 5}}>
            <Button
              title="Sign Out"
              onPress={removeValue}
            />
        </View>
        {/* <Text style={styles.textStyle}>{filePath.uri}</Text> */}
        {/* <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>
            Launch Camera for Image
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('video')}>
          <Text style={styles.textStyle}>
            Launch Camera for Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('video')}>
          <Text style={styles.textStyle}>Choose Video</Text>
        </TouchableOpacity> */}
      </View>
      </ScrollView>
      {/* <View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.bottomButtons} >
            <View style={{ justifyContent: 'center',alignItems: 'center',}}>
                <Icon1 name="ios-pricetag" size={30} color="black"  />
                <Text style={styles.footerText}>Home</Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.bottomButtons} >
            <View style={{ justifyContent: 'center',alignItems: 'center',}}>
                <Icon1 name="ios-pricetag-sharp" size={30} color="black" />
                <Text style={styles.footerText}>Bid</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButtons} >
            <View style={{ justifyContent: 'center',alignItems: 'center',}}>
                <Icon1 name="ios-pricetags-sharp" size={30} color="black" />
                <Text style={styles.footerText}>My Auction</Text>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.bottomButtons} onPress={() => navigation.navigate('Profile')}>
            <View style={{ justifyContent: 'center',alignItems: 'center',}}>
                <Icon1 name="person-circle-sharp" size={30} color="black" />
                <Text style={styles.footerText}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View> */}
    {/* </View> */}
    </SafeAreaView>
    );
      }
  };
  
  export default Home;
  
  const styles = StyleSheet.create({
    container: {
      //flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 20,
    },
    textStyle: {
      padding: 10,
      color: 'black',
      textAlign: 'center',
    },
    buttonStyle: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 5,
      marginVertical: 10,
      width: 250,
    },
    imageStyle: {
      width: 350,
      height: 350,
      margin: 5,
    },
    footer: {
      position: 'absolute',
      flex:0.1,
      left: 0,
      right: 0,
      bottom: -10,
      backgroundColor:'white',
      flexDirection:'row',
      height:80,
      alignItems:'center',
      justifyContent: 'center',
    },
    bottomButtons: {
      alignItems:'center',
      justifyContent: 'center',
      flex:1,
    },
    footerText: {
      color:'black',
      fontWeight:'bold',
      alignItems:'center',
      fontSize:16,
    },
  });