import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet,Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import LottieView from "lottie-react-native";

const NotificationPermissionScreen = () => {
  const router = useRouter();
  const { width, height } = Dimensions.get('window');
  const smallFontSize = Math.min(width, height) * 0.03;
  const largeFontSize = Math.min(width, height) * 0.06;
  const MediumFontSize = Math.min(width, height) * 0.04;
  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      // Permission granted, navigate to the main notification screen
      router.replace('/wishlist');
    } else {
      // Handle permission denial
      alert('Permission denied');
      router.replace('/wishlist');
    }
  };
const skipped = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status ==='denied'){
    alert('Permission denied');
   // Skip permission screen if permission denied
  router.replace('/wishlist');  
  }

}

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status === 'granted') {
        // Skip permission screen if permission already granted
        router.replace('/wishlist');
      }
    };

    checkPermission();
  }, []);

  return (  
    <SafeAreaView style={{flex:1, backgroundColor:Colors.primary}}>
                <LottieView
          source={require("../../../assets/lottie/notification.json")}
          autoPlay
          loop
          style={{ width: "100%", height: "50%" }}
        />
    <View style={styles.container}>

      <Text style={[styles.title,{fontSize:largeFontSize}]}>Enable Notifications</Text>
      <View style={{gap:5}}>
      <Text style={[styles.description,{fontSize:MediumFontSize}]}>
        We'll notify you when
      </Text>
        <Text style={{ fontSize: smallFontSize,  color: 'white',fontFamily:"Quicksand-Medium" }}>
          BlinkCard will send you notifications when you receive money transfers, new messages, or other important updates.
        </Text>        
      </View>

      
      {/* <Button title="Enable Notifications" onPress={requestPermission} /> */}
      <View style={{flex:1, paddingBottom:10}}/>

      <TouchableOpacity
          onPress={requestPermission}
          style={[
            defaultStyles.pillButton,
            { backgroundColor: Colors.platium, width: 400 },
          ]}
        >
          <Text style={[defaultStyles.buttonText,{color: 'black'}]}>Enable Notifications</Text>
        </TouchableOpacity>

      <TouchableOpacity
          onPress={skipped}
          style={[
            defaultStyles.pillButton,
            { backgroundColor: Colors.primary, width: 400 },
          ]}
        >
          <Text style={[defaultStyles.buttonText,{color: 'white'}]}>Not now</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap:20
  },
  title: {
    color: 'white',
    fontFamily:"Quicksand-Bold"

  },
  description: {
    textAlign: 'center',
    color: 'white',
    fontFamily:"Quicksand-SemiBold"
  },
});

export default NotificationPermissionScreen;
