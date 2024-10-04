

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const signupscreen = () => {
  const [password, setpassword] = useState('');
  const [Confirmpassword, setconfirmpassword] = useState('');
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  const handleNext = () => {
    if (!password || !Confirmpassword) {
      alert('Please fill in all required fields.');
      return;
    }
    router.push({
      pathname: '/signuptwo',
      params: {password},
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
          <Image style={styles.logo} source={require('../assets/images/finallogobc.png')} />
          <Text style={styles.h1}>Secure your account</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setpassword}
            placeholder='Password'
            placeholderTextColor={'gray'}
          />
          <TextInput
            style={styles.input}
            value={Confirmpassword}
            onChangeText={setconfirmpassword}
            placeholder='Confirm password'
            placeholderTextColor={'gray'}
          />
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
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    padding: 10,
    fontFamily: 'Quicksand-Bold',
    borderRadius: 50,
    height: 50,
    backgroundColor: Colors.lightGray,
    marginBottom: 16,
  },
  h1: {
    fontSize: 30,
    fontFamily: 'Quicksand-Bold',
    paddingBottom: 10,
    fontWeight:"bold",

  },
  p: {
    fontSize: 16,
    fontFamily: 'Quicksand-Regular',
    paddingBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
});

export default signupscreen;
