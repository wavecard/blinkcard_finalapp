import React, { forwardRef, useMemo, useEffect } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { BottomSheetModal as GorhomBottomSheetModal } from "@gorhom/bottom-sheet";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import * as LocalAuthentication from 'expo-local-authentication';

export type Ref = GorhomBottomSheetModal;

const BiomatricBSM = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["45%"], []);
  const router = useRouter();

  const goHome = () => {
    router.replace('/login');
  };

  const profile = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert("Biometrics not supported", "Your device does not support biometric authentication.");
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert("Biometrics not set up", "Please set up biometric authentication on your device.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        router.replace('/wishlist');
      } else {
        Alert.alert("Authentication failed", "Could not authenticate using biometrics. Please try again.");
      }
    } catch (error) {
      console.error("Biometric authentication failed", error);
      Alert.alert("Error", "An error occurred during biometric authentication.");
    }
  };

  useEffect(() => {
    const checkBiometricSupport = async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!hasHardware || !isEnrolled) {
          Alert.alert("Biometric Authentication", "Biometrics are not available or not enrolled on this device.");
        }
      } catch (error) {
        console.error("Error checking biometric support", error);
        Alert.alert("Error", "An error occurred while checking biometric support.");
      }
    };

    checkBiometricSupport();
  }, []);

  return (
    <GorhomBottomSheetModal ref={ref} index={0} snapPoints={snapPoints}>
      <View style={{ justifyContent: "center", alignItems: "center", gap: 16, padding: 10 }}>
        <LottieView
          source={require("../../assets/lottie/lock.json")}
          autoPlay
          loop
          style={{ width: "30%", height: "30%" }}
        />
        <Text style={{ fontSize: 24, fontFamily: "Quicksand-Bold" }}>Use Face ID?</Text>
        <Text style={{ fontSize: 16, textAlign: "center", fontFamily: "Quicksand-Medium" }}>
          You can hold your account for free, even if you don't use Blink Card.
        </Text>

        <TouchableOpacity
          onPress={profile}
          style={[
            defaultStyles.pillButton,
            { backgroundColor: Colors.primary, width: 400 },
          ]}
        >
          <Text style={defaultStyles.buttonText}>Yes, enable Face ID</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goHome}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              backgroundColor: Colors.lightGray,
              width: 400,
            },
          ]}
        >
          <Text style={{ fontSize: 18, fontWeight: '500' }}>Not now</Text>
        </TouchableOpacity>
      </View>
    </GorhomBottomSheetModal>
  );
});

export default BiomatricBSM;
