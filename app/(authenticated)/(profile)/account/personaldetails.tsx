import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet, Alert, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, } from 'react-native';
import useProtectedRoute from "../../../AuthRoute/useProtectedRoutes";
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

export default function PersonalDetails() {
  const {
    firstname,
    lastname,
    email,
    emailVerificationStatus,
    mobileVerificationStatus,
    kycVerificationStatus,
    SessionId,
    phoneNumber
  } = useProtectedRoute();

  const [isEditing, setIsEditing] = useState(false);
  const { width, height } = Dimensions.get("window");
  const smallFontSize = Math.min(width, height) * 0.028;
  const largeFontSize = Math.min(width, height) * 0.009;
  const [emailValue, setEmailValue] = useState(email || '');
  const [kycStatus, setKycStatus] = useState(kycVerificationStatus || '');
  
  // Initialize state from protected route
  useEffect(() => {
    setEmailValue(email || '');    
    setKycStatus(kycVerificationStatus || '');
  }, [email, kycVerificationStatus]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 90;
  const handleSave = async () => {
    setIsEditing(false);

    // Send API request to update additional fields (but not name and phone number)
    try {
      const response = await fetch('https://api.example.com/updateDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: SessionId,   
          email: emailValue,      
          kycVerificationStatus: kycStatus,  
          phoneNumber,   
          firstname,              
          lastname,               
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Details updated successfully');
      } else {
        Alert.alert('Error', result.message || 'Failed to update details');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1, backgroundColor: 'white' }}
    behavior="padding"
    keyboardVerticalOffset={keyboardVerticalOffset}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.actions}>
          <TouchableOpacity
                      style={[
                        styles.btn,
                        { backgroundColor: Colors.primaryMuted, borderRadius:20 },
                      ]}
          >
          <Text style={[styles.input,{height:0, paddingBottom:20, padding:0,backgroundColor: Colors.primaryMuted, fontSize:40}]}>Name: {firstname} {lastname}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={emailValue}
            onChangeText={setEmailValue}
            placeholder="Enter your email"
            keyboardType="email-address"
            placeholderTextColor={'gray'}

          />
          <TouchableOpacity
                      style={[
                        styles.btn,
                        { backgroundColor: Colors.primaryMuted, borderRadius:20 },
                      ]}
          >
          <Text style={[styles.input,{height:0, paddingBottom:20, padding:0,backgroundColor: Colors.primaryMuted}]}>Phone Number: {phoneNumber}</Text>
          </TouchableOpacity>
          <TouchableOpacity
                      style={[
                        styles.btn,
                        { backgroundColor: Colors.primaryMuted, borderRadius:20 },
                      ]}
          >
          <Text style={[styles.input,{height:0, paddingBottom:20, padding:0,backgroundColor: Colors.primaryMuted}]}>KYC Status: {kycStatus}</Text>
          </TouchableOpacity>
          <TouchableOpacity
                      style={[
                        styles.btn,
                        { backgroundColor: Colors.primaryMuted, borderRadius:20 },
                      ]}
          >
          <Text style={[styles.input,{height:0, paddingBottom:20, padding:0,backgroundColor: Colors.primaryMuted}]}>Email verification status: {emailVerificationStatus}</Text>    
          </TouchableOpacity>
          <View style={{flex:1}}/>
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              { marginBottom: 20, backgroundColor:"black" },
            ]}
            onPress={handleSave}>
            <Text style={defaultStyles.buttonText}>Save details</Text>
          </TouchableOpacity>
          <Text style={[styles.terms,{fontSize:smallFontSize}]}> As per RBI guidelines, your name and mobile number cannot be changed to maintain the integrity of the KYC process and prevent fraud. For any changes, please contact support team.</Text>
        </View>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity
                      style={[
                        styles.btn,
                        { backgroundColor: Colors.primaryMuted, borderRadius:20 },
                      ]}
          >
          <Text style={[defaultStyles.buttonText,{color:"black", fontFamily:"Quicksand-SemiBold"}]}>Name: {firstname} {lastname}</Text>
          </TouchableOpacity>
          <TouchableOpacity
                      style={[
                        styles.btn,
                        { backgroundColor: Colors.primaryMuted, borderRadius:20 },
                      ]}
          >
          <Text style={[defaultStyles.buttonText,{color:"black", fontFamily:"Quicksand-SemiBold"}]}>Email: {emailValue}</Text>
          </TouchableOpacity>
          <TouchableOpacity
                      style={[
                        styles.btn,
                        { backgroundColor: Colors.primaryMuted, borderRadius:20 },
                      ]}
          >
          <Text style={[defaultStyles.buttonText,{color:"black", fontFamily:"Quicksand-SemiBold"}]}>Phone Number: {phoneNumber}</Text>
          </TouchableOpacity>
          <TouchableOpacity
                      style={[
                        styles.btn,
                        { backgroundColor: Colors.primaryMuted, borderRadius:20 },
                      ]}
          >
          <Text style={[defaultStyles.buttonText,{color:"black", fontFamily:"Quicksand-SemiBold"}]}>KYC Status: {kycStatus}</Text>
          </TouchableOpacity>
          <TouchableOpacity
                      style={[
                        styles.btn,
                        { backgroundColor: Colors.primaryMuted, borderRadius:20 },
                      ]}
          >
          <Text style={[defaultStyles.buttonText,{color:"black", fontFamily:"Quicksand-SemiBold"}]}>Email verification: {emailVerificationStatus}</Text>    
          </TouchableOpacity>
          <View style={{flex:1}}/>
          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              { marginBottom: 20, backgroundColor:"black" },
            ]}
            onPress={handleEdit}>
            <Text style={defaultStyles.buttonText}>Edit details</Text>
          </TouchableOpacity>
          <Text style={[styles.terms,{fontSize:smallFontSize}]}> As per RBI guidelines, your name and mobile number cannot be changed to maintain the integrity of the KYC process and prevent fraud. For any changes, please contact support team.</Text>
        </View>
      )}
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    borderColor: "transparent",
    borderWidth: 1,
    padding: 10,
    fontFamily: 'Quicksand-Bold',
    borderRadius: 50,
    height: 50,
    backgroundColor: Colors.lightGray,  
  },
  actions: {
    margin: 10,
    gap:10,
    flex:1
  },
  btn: {
    padding: 14,
    flexDirection: "row",
    gap: 20,
  },
  terms: {
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'center',
    paddingTop: 10,
  },
});
