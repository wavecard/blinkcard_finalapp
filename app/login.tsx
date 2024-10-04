import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, Alert, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { useState } from 'react';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';

const login = () => {  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const router = useRouter();
  const { width, height } = Dimensions.get('window');
  const mediumFontSize = Math.min(width, height) * 0.04;
  const largeFontSize = Math.min(width, height) * 0.09;
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const API_URL = 'https://j70x7qx5pk.execute-api.ap-south-1.amazonaws.com/dev/generate-otp';

  const isPhoneNumberValid = (number: string) => {
    return /^\d{10}$/.test(number);
  };
 const mailLogin = () => {
 router.push({pathname: '/maillogin',
  params: {type: 'maillogin'}
})
}
 
  const onSignIn = async () => {
    if (!isPhoneNumberValid(phoneNumber)) {
      Alert.alert('Invalid phone number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    try {
      await axios.post(API_URL, { phoneNumber: fullPhoneNumber });
      router.push({ pathname: '/verify/[phone]', params: { phone: fullPhoneNumber } });
    } catch (error) {
      if ((error as any).response && (error as any).response.data) {
        const { message } = (error as any).response.data;
        Alert.alert('Error', message);
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "white", padding: 16}}>
        <View style={{flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>
          <View>
          <Text style={{ fontSize: largeFontSize, textAlign:"center",fontFamily:"Quicksand-Bold" }}>Welcome back</Text>
          <Text style={{ fontSize: mediumFontSize, textAlign:"center",fontFamily:"Quicksand-Medium" }}>Enter your phone number to Login</Text>   
          </View>
          <Image style={styles.logo} source={require('../assets/images/logobtn.png')} />
          </View>

          <View style={styles.phoneContainer}>
            <TextInput
              style={styles.countryCodeInput}
              value={countryCode}
              onChangeText={setCountryCode}
              keyboardType="phone-pad"
              readOnly
            /> 
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              placeholder='Phone number'
              placeholderTextColor={'gray'}
            />
          </View>

          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              phoneNumber !== '' ? styles.enabled : styles.disabled,
              { marginBottom: 20 },
            ]}
            onPress={onSignIn}>
            <Text style={defaultStyles.buttonText}>Get in</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
            />
            <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
            <View
              style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: Colors.gray }}
            />
          </View>
          <TouchableOpacity
           onPress={mailLogin}
            style={[
              defaultStyles.pillButton,
              {
                flexDirection: 'row',
                gap: 16,
                marginTop: 20,
                backgroundColor: "#F7F5F5",
              },
            ]}>
            <Ionicons name="mail-outline" size={24} color={'#000'} />
            <Text style={[defaultStyles.buttonText, { color: '#000' }]}>Continue with email</Text>
          </TouchableOpacity>
          <Link href={{
            pathname: '/signup',
            params: { type: 'signup' },
          }} replace asChild>
            <TouchableOpacity>
              <Text style={[defaultStyles.textLink, { textAlign: "center", padding: 10 }]}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
    gap: 10,
  },
  countryCodeInput: {
    borderWidth: 1,
    borderColor: "transparent",
    fontFamily: 'Quicksand-Bold',
    borderRadius: 40,
    height: 50,
    width: 80,
    backgroundColor: Colors.lightGray,
    textAlign: 'center'
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
    fontFamily: 'Quicksand-Bold',
    borderRadius: 40,
    height: 50,
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
});

export default login;
