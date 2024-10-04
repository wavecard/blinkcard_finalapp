import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const SignupStep1 = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');  
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phoneNumber: string) => /^\d{10}$/.test(phoneNumber);

  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 90;

  const handleNext = () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    if (!firstname || !lastname) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    router.push({
      pathname: '/signuptwo',
      params: { firstname, lastname, email, fullPhoneNumber },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* <Image style={styles.logo} source={require('../assets/images/finallogobc.png')} /> */}
          <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
          <Text style={styles.h1}>Name as in Gov ID </Text>
          <Ionicons name="id-card" size={40} color={Colors.primary} /> 
          </View>

          <Text style={styles.p}>Name as in your Aadhaar or Pan Card</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            style={styles.inputone}
            value={firstname}
            onChangeText={setFirstname}
            placeholder='First & middle name'
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.inputone}
            value={lastname}
            onChangeText={setLastname}
            placeholder='Last name'
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.inputtwo}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder='Email'
            placeholderTextColor={'gray'}
          />

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
          
          <View style={{flex:1, paddingBottom:10}}/>
          <TouchableOpacity
            onPress={handleNext}
            style={[
              defaultStyles.pillButton,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                backgroundColor: Colors.primary,
              }
            ]}
          >
            <Text style={[defaultStyles.buttonText, { color: 'white', marginRight: 8 }]}>Next</Text>
            <Ionicons name="chevron-forward-circle-outline" size={24} color={'white'} />
          </TouchableOpacity>
          </ScrollView>
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
  inputtwo: {
    borderColor: "transparent",
    borderWidth: 1,
    padding: 10,
    fontFamily: 'Quicksand-Bold',
    borderRadius: 50,
    height: 50,
    backgroundColor: Colors.lightGray,
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
  h1: {
    fontSize: 30,
    fontFamily: 'Quicksand-Bold',
    paddingBottom: 10,
    fontWeight:"bold",

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
  p: {
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
    paddingBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
});

export default SignupStep1;
