import {KeyboardAvoidingView, TextInput,Text, View , StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback, Platform, Keyboard} from 'react-native'
import React, { useState } from 'react'
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from 'expo-router';

export default function resetpassword ()  {
    const [Password, setPassword] = useState("");
    const [Confirmpassword, setConfirmpassword] = useState("");
    const router = useRouter();

    const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;
    const isPassword = (text: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
      };
    const onPasswordreset = async () => {
        if (!isPassword(Password)) {
          Alert.alert("Password not secure", "Please set a secure password.");
          return;
        } else {
            router.push({pathname: '/maillogin',
              params: {type: 'maillogin'}
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
        <Text  style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>Set Password</Text>
        <View style={{ gap: 5, paddingTop: 10 }}>
            <TextInput    
              style={styles.input}
              value={Password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={"gray"}
              autoCapitalize="none"            
              />
              <TextInput    
              style={styles.input}
              value={Confirmpassword}
              onChangeText={setConfirmpassword}
              placeholder="Confirm Password"
              placeholderTextColor={"gray"}
              autoCapitalize="none"            
              />
            </View>
            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                Password !== "" ? styles.enabled : styles.disabled,
                { marginBottom: 20 },
              ]}
              onPress={onPasswordreset}
            >
              <Text style={defaultStyles.buttonText}>Set Password</Text>
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
