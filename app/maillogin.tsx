import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Link , useRouter} from "expo-router";
import {Maillogin} from "../app/api/auth";

export default function MailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;
  const { width, height } = Dimensions.get('window');
  const mediumFontSize = Math.min(width, height) * 0.04;
  const largeFontSize = Math.min(width, height) * 0.09;
  const isEmailValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

  const onSignIn = async () => {
    if (!isEmailValid(email)) {
      Alert.alert("Invalid email", "Please enter a valid email.");
      return;
    }
  
    try {
      setLoading(true);
      const response = await Maillogin(email, password);
      if (response.token) {
        router.replace("/wishlist");
      } else {
        setLoading(false);
      }
    }
  catch (error: any) {
    setLoading(false);
    if (error.response) {
      switch (error.response.status) {
        case 400:
          Alert.alert("Error", "User not found.");
          break;
        case 401:
          Alert.alert("Error", "Invalid email or password.");
          break;
        case 403:
          Alert.alert("Error", "Email is not verified. Unable to login.");
          break;
        default:
          Alert.alert("Error", "An error occurred. Please try again later.");
          break;
      }
    } else {
      Alert.alert("Error", "An error occurred. Please check your connection and try again.");
    }
    console.error("API error:", error);
  }
};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
            <View>
              <Text
                style={{ fontSize: largeFontSize, textAlign: "center", fontFamily: "Quicksand-Bold" }}
              >
                Welcome back
              </Text>
              <Text
                style={{ fontSize: mediumFontSize, textAlign: "center", fontFamily: "Quicksand-Medium" }}
              >
                Enter your email to Login
              </Text>
            </View>
            <Image
              style={styles.logo}
              source={require("../assets/images/logobtn.png")}
            />
          </View>

          <View style={{ gap: 5, paddingTop: 10 }}>
            <TextInput
              mode="outlined"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={"gray"}
              autoCapitalize="none"
              keyboardType="email-address"
              theme={{ roundness: 30, colors: { primary: Colors.primary } }}
            />
            <TextInput
              mode="outlined"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={"gray"}
              autoCapitalize="none"
              secureTextEntry={hidePass}
              right={
                <TextInput.Icon
                  icon={hidePass ? "eye" : "eye-off"}
                  onPress={() => setHidePass(!hidePass)}
                  size={20}
                  style={styles.iconStyle}
                />
              }
              theme={{ roundness: 30, colors: { primary: Colors.primary } }}
            />

            <Link
              href={{
                pathname: "/forgotpassword",
                params: { type: "forgotpassword" },
              }}
              replace
              asChild
            >
              <TouchableOpacity>
                <Text
                  style={[
                    defaultStyles.textLink,
                    {
                      textAlign: "right",
                      padding: 10,
                      color: "black",
                      fontSize: 18,
                      fontWeight: "normal",
                      fontFamily: "Quicksand-Medium",
                    },
                  ]}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              style={[
                defaultStyles.pillButton,
                email !== "" ? styles.enabled : styles.disabled,
                { marginBottom: 20 },
              ]}
              onPress={onSignIn}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={defaultStyles.buttonText}>Get in</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
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
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
