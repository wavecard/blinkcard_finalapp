import {KeyboardAvoidingView, TextInput,Text, View , StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native'
import React, { useState } from 'react'
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from 'expo-router';

export default function forgotpassword ()  {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const router = useRouter();


    const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;
    const isEmailValid = (text: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    };
    const onForgotPassword = async () => {
      if (!isEmailValid(email)) {
        Alert.alert("Invalid email", "Please enter a valid email.");
        return;
      } else {
        router.push({pathname: '/resetpassword',
          params: {type: 'resetpassword'}
      })
    }
    };
    return (
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
        <Text  style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Forgot Password</Text>
        <View style={{ gap: 5, paddingTop: 10 }}>
            <TextInput    
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={"gray"}
              autoCapitalize="none"            
              />
            </View>
            <View style={{flex:1}}/>
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                email !== "" ? styles.enabled : styles.disabled,
                { marginBottom: 20 },
              ]}
              onPress={onForgotPassword}
            >
              <Text style={defaultStyles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  
}


const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: 16,
    fontFamily: "Quicksand-Bold",
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    marginBottom: 16,
    height: 50,
    justifyContent: "center",
  },
  iconStyle: {
    alignSelf: "center",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 40,
    gap: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
