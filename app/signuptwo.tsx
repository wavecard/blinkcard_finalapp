import React, { useState } from 'react';
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Linking } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import axios from 'axios';
import CheckBox from '../components/chcekbox'

const SignupStep2 = () => {
  const { firstname, lastname, email, fullPhoneNumber } = useLocalSearchParams();
  const [password, setpassword] = useState('');
  const [Confirmpassword, setconfirmpassword] = useState('');
  const { width, height } = Dimensions.get('window');
  const largeFontSize = Math.min(width, height) * 0.07;
  const router = useRouter();
  const SIGNUP_API_URL = 'https://apz74fux1f.execute-api.ap-south-1.amazonaws.com/dev/signup';
  const OTP_API_URL = 'https://j70x7qx5pk.execute-api.ap-south-1.amazonaws.com/dev/generate-otp';
  const [checked, setChecked] = React.useState(false);
  const validateChecked = (checked: boolean) => checked;
  const phoneNumber = Array.isArray(fullPhoneNumber) ? fullPhoneNumber.join('') : fullPhoneNumber;

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  const handleSignup = async () => {

    if (!password || !checked) {
      alert('Please fill in all required fields.');
      return;
    }


if (!validateChecked(checked)) {
     alert('Please agree to the terms and conditions.');
}

    try {
      const response = await axios.post(SIGNUP_API_URL, {
        phoneNumber,
        firstname: firstname || 'First Name',  
        lastname: lastname || 'Last Name',  
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('API response:', response.data);
      alert('User created successfully');

      // Send OTP
      await axios.post(OTP_API_URL, { phoneNumber});

      // Navigate to verify screen
      router.push({ pathname: '/verify/[phone]', params: { phone: phoneNumber } });
    } catch (error: any) { // Use "any" to allow for error objects with custom properties
      if (error.response && error.response.status === 400) {
        alert('User already exists.');
      } else {
        console.error('API error:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  const openLink = () => {
    Linking.openURL('https://www.blinkcard.in/legal/policies');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{flexDirection:"row",  alignItems:"center"}}>
          <Text style={[styles.h1, {fontSize: largeFontSize}]}>Complete Account Setup</Text>
          {/* <Image style={styles.logo} source={require('../assets/images/logobtn.png')} />             */}
          </View>

          <TextInput
            style={styles.inputone}
            value={password}
            onChangeText={setpassword}
            placeholder='Password'
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.inputone}
            value={Confirmpassword}
            onChangeText={setconfirmpassword}
            placeholder='Confirm password'
            placeholderTextColor={'gray'}
          />
            <CheckBox
                onPress={() => setChecked(!checked)}
                title="Keep me up to date about Blink Card Offers"
                isChecked={checked}
                
              />

          <Text style={styles.discription}>
            By pressing Create an account, you agree to our {""}
            <Text style={[styles.link, { fontSize: 15 }]} onPress={openLink}>Terms & Conditions</Text> {""}
            <Text>and</Text> {""}
            <Text style={[styles.link, { fontSize: 15 }]} onPress={openLink}>Privacy Policy</Text>
          </Text>
          <View style={{flex:1}}/>
          <TouchableOpacity
            onPress={handleSignup}
            style={[
              defaultStyles.pillButton,
              {
                flexDirection: 'row',
                gap: 16,
                marginTop: 20,
                backgroundColor: Colors.primary,
              },
            ]}>
            <Text style={[defaultStyles.buttonText, { color: 'white' }]}>Create an account</Text>
          </TouchableOpacity>
          <Link href={{
            pathname: '/login',
            params: { type: 'login' },
          }} replace asChild>
            <TouchableOpacity>
              <Text style={[defaultStyles.textLink, { textAlign: "center", padding: 10 }]}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  inputone: {
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
    fontFamily: 'Quicksand-Bold',
    borderRadius: 50,
    height: 50,
    backgroundColor: Colors.lightGray,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
    fontFamily: 'Quicksand-Bold',
    borderRadius: 50,
    height: 50,
    backgroundColor: Colors.lightGray,
    marginBottom: 16,
    flex: 1,
  },
  phoneContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    gap: 10,
  },
  countryCodeInput: {  
    borderColor: "transparent",
    fontFamily: 'Quicksand-Bold',
    borderRadius: 50,
    height: 50,
    width: 80,
    backgroundColor: Colors.lightGray,
    textAlign: 'center'
  },
  h1: {
    fontFamily: 'Quicksand-Bold',
    paddingBottom: 10,
    // textAlign: 'center',
  },
  inputtwo: {
    borderColor: "transparent",
    borderWidth: 1,
    padding: 10,
    fontFamily: 'Quicksand-Bold',
    borderRadius: 50,
    height: 50,
    backgroundColor: Colors.lightGray,
  },
  discription: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    paddingTop: 10,
  },
  link: {
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default SignupStep2;
