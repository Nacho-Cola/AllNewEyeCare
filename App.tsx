/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useState, useCallback, useRef, useEffect} from "react";
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';

import { Camera,
  useCameraDevice,
  useCameraPermission,
  useCameraFormat,
 } from "react-native-vision-camera";

import qs from 'qs'
import YoutubePlayer  from "react-native-youtube-iframe";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';




import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const URL = "http://58.234.7.105:5454"

import UnityView from '@azesmway/react-native-unity';


const YoutubeIdInput = () => {
  const [text, onChangeText] = useState('myyhD2bFFIw');
  const height = (Dimensions.get("window").width / 16) * 9;
  return (
    <SafeAreaView>
      <YoutubePlayer videoId={text} play={true} height={height}/>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText(text)}
        value={text}
        placeholder="Input Youtube ID here…"
        returnKeyType="done"
      />
    </SafeAreaView>
  );
};

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'light';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef(null);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const executeCallback = () => {
      savedCallback.current();
    };
    const timerId = setInterval(executeCallback, delay);
    return () => clearInterval(timerId);
  }, []);
};
//export default useInterval; // 반복 함수

function blobToBase64(blob:Blob){
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  })
}

const get_yolo = async (image: any) => { 
  fetch( "http://58.234.7.105:5454/detect/", {
    method: 'post',
    body: JSON.stringify({ "image" : image }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => {
    console.log(res)
  });
};

const EyeCamera = () => {
  const camera = useRef<Camera>(null)
  const isActive = "active"
  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice("front")
  const format = useCameraFormat(device, [
    { fps: 30 },
    { photoHDR: true }
  ])

  useInterval(() => {take_photo()}, 5000); // 5초 반복


  const take_photo = async() =>{
    const photo = await camera.current.takePhoto({
      flash: 'off',
      enableShutterSound: false
    })

    // await CameraRoll.save(`file://${photo.path}`, {type: 'photo',}) //사진저장
    
    
    if(photo != null) {
      const result = await fetch(`file://${photo.path}`)
      const data = await result.blob();
      const base64Data = await blobToBase64(data)
      get_yolo(base64Data)
    } 
  }


  if (device == null) return (<Text style={{color:"#fff",fontWeight:"800"}}>Error</Text>)
  return(
    <View style={styles.camera_view}>
      <Camera 
        style={styles.camera}
        ref={camera}
        device={device} 
        isActive={true} 
        format={format}
        photo={true}
        enableHighQualityPhotos={true}
      />  
      <TouchableOpacity style={styles.snap_btn} onPress={()=>take_photo()}>
        <Text style={styles.snap_text}>snap</Text>
      </TouchableOpacity>
    </View>
  )
}




function App({navigation}): JSX.Element {
  const isDarkMode = useColorScheme() === 'light';
  const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,flexGrow: 1
  };
    
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.background}>
          <YoutubeIdInput/>
          <Section title="Use Guide">
            Input <Text style={styles.highlight}>YouTube ID</Text> to change Video on screen.
          </Section>
        <EyeCamera/>
        <Section title="Auto Decision">
            If you want to get result Immediately <Text style={styles.highlight}>Push Red Butten</Text> to get.
        </Section>

        <TouchableOpacity style={styles.input_ls} onPress={() => {navigation.navigate('Record')}}>
          <Text style={styles.input_tx}>Detected Img</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.enter_vr} onPress={() => {navigation.navigate('Unity')}}>
          <Text style={styles.input_tx}>Vr vision</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}


function Login({navigation}){
  const [ID, getUserId] = useState('');
  const [PW, getUserPassword] = useState('');
  var logined :number = 0
  const log_in = (id:string, pw:string)=>{
    fetch("http://58.234.7.105:5454/api/user/login",{
      method: 'post',
        body:qs.stringify({
          username: id,
          password: pw,
          }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' ,
        },
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        logined = 1 
      })
      .catch(error => {Alert.alert("error")})
  }

  return(
    <SafeAreaView>
      <Text style={{
        fontSize:70,
        fontWeight:"200",
        alignSelf:'center',
        padding:60,
        }}>EyeCare</Text>
      <View style={{marginTop :40}}>
        <TextInput 
        style={styles.input_idpw} 
        onChangeText={ (ID) => getUserId(ID)}
        value={ID}
        placeholder=" Input ID here"
        returnKeyType="done"
        autoCapitalize="none"
        />
        <TextInput 
        style={styles.input_idpw} 
        onChangeText={(PW) => getUserPassword(PW)}
        secureTextEntry={true}
        value={PW}
        placeholder=" Input PW here"
        returnKeyType="done"
        autoCapitalize="none"
        />

      </View>
      <TouchableOpacity style={styles.input_ls} onPress={() => {
        log_in(ID,PW)
        if(logined){
          Alert.alert('Log In Success')
          navigation.navigate('EyeCare')
        }
        }}>
          <Text style={styles.input_tx}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.input_ls} onPress={() => {navigation.navigate('Sign In')}}>
          <Text style={styles.input_tx}>Sign In</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}



function SignIn({navigation}){
  const [ID, getUserId] = useState('');
  const [PW1, getUserPassword] = useState('');
  const [PW2, checkUserPassword] = useState('');
  const [email, getUserEmail] = useState('');

  var is_created:Number = 0

  function post_user(id:string ,pw1:string ,pw2:string ,em:string ) {
    fetch("http://58.234.7.105:5454/api/user/create",{
        method: 'post',
        body:JSON.stringify({
          username: id,
          password1: pw1,
          password2: pw2,
          email: em}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        is_created = 1
      })
      .catch(error => {Alert.alert("error")})
  }

  return(
    <SafeAreaView>
        <Text style={{
        fontSize:70,
        fontWeight:"200",
        alignSelf:'center',
        padding:60,
        }}>EyeCare</Text>
      <View>
        <TextInput 
        style={styles.input_idpw} 
        onChangeText={ (ID) => getUserId(ID)}
        value={ID}
        placeholder=" Input ID here"
        returnKeyType="done"
        autoCapitalize="none"
        />
        <TextInput 
        style={styles.input_idpw} 
        onChangeText={(email) => getUserEmail(email)}
        value={email}
        placeholder=" Input Email here"
        returnKeyType="done"
        autoCapitalize="none"
        />
        <TextInput 
        style={styles.input_idpw} 
        onChangeText={(PW1) => getUserPassword(PW1)}
        secureTextEntry={true}
        value={PW1}
        placeholder=" Input PW here"
        returnKeyType="done"
        autoCapitalize="none"
        />
        <TextInput 
        style={styles.input_idpw} 
        onChangeText={(PW2) => checkUserPassword(PW2)}
        secureTextEntry={true}
        value={PW2}
        placeholder=" Verify Password"
        returnKeyType="done"
        autoCapitalize="none"
        />

      </View>
        <TouchableOpacity style={styles.input_ls} onPress={() => {
          post_user(ID,PW1,PW2,email)
          if (is_created) {
            Alert.alert('Sign In Success');
            navigation.navigate('Log In')
          }
        }

      }>
          <Text style={styles.input_tx}>Sign In</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

function Record({navigation}){
  return(
    <Text>record page</Text>
  )
}

const Unity = (navigation) => {
  const {width, height} = Dimensions.get('window');
  return (
    <>
      <View>
        <UnityView
          style={{width: width, height: height}}
        />
      </View>
    </>
  );
};

// export default App;


const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Log In" component={Login} options={{headerBackTitleVisible: false}}/>
        <Stack.Screen name="Sign In" component={SignIn} options={{headerBackTitleVisible: false}}/>
        <Stack.Screen name="EyeCare" component={App} options={{headerBackTitleVisible: false}}/>
        <Stack.Screen name="Record" component={Record} options={{headerBackTitleVisible: false}}/>
        <Stack.Screen name="Unity" component={Unity} options={{headerBackTitleVisible: false, headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};






const styles = StyleSheet.create({
  background:{
    height:"100%"
  },
  sectionContainer: {
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '800',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    fontSize: 18,
    height: 50,
    margin: 12,
    borderWidth: 2,
    padding: 13,
  },
  input_idpw: {
    fontSize: 18,
    height: 50,
    width: '80%',
    alignSelf:'center',
    marginBottom: -2,
    borderRadius:15,
    borderColor:"#a0a0a0",
    backgroundColor:"white",
    borderWidth: 2,
  },
  input_ls: {
    fontSize: 18,
    height: 50,
    margin: -2,
    width: '80%',
    alignSelf:'center',
    borderRadius:15,
    borderColor:"#fff",
    backgroundColor:"#2060ff",
    borderWidth: 2,
  },

  enter_vr: {
    fontSize: 18,
    height: 50,
    margin: -2,
    width: '80%',
    alignSelf:'center',
    borderRadius:15,
    borderColor:"#fff",
    backgroundColor:"#309030",
    borderWidth: 2,
  },


  input_tx:{
    color:'white',
    fontWeight:"700",
    alignSelf:'center',
    fontSize:18,
    position:'absolute',
    bottom:14,
  },

  camera:{
    height: "100%",
  },
  camera_view:{
    width:"100%",
    height:600,
    backgroundColor:"#000"
  },
  snap_btn:{
    backgroundColor:"red",
    width:60,
    height:60,
    borderRadius:30,
    position:'relative',
    bottom:80,
    alignSelf:"center",
  },
  snap_text:{
    textAlign:'center',
    height:60,
    width:60,
    bottom:-20,
  },
});

export default Navigation;
